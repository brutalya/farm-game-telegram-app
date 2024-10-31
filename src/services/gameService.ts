// src/services/GameService.ts
import crypto from 'crypto';
import dotenv from 'dotenv';
import { AppDataSource } from '../config/database';
import { Field } from '../entities/Field';
import { Inventory } from '../entities/Inventory';
import { Plant } from '../entities/Plant';
import { Player } from '../entities/Player';
import { PlayerPlants } from '../entities/PlayerPlants';
import { Spot } from '../entities/Spot';

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'your_bot_token';
console.log('Telegram Bot Token outside:', TELEGRAM_BOT_TOKEN);

export class GameService {
	private playerRepository = AppDataSource.getRepository(Player);
	private fieldRepository = AppDataSource.getRepository(Field);
	private plantRepository = AppDataSource.getRepository(Plant);
	private inventoryRepository = AppDataSource.getRepository(Inventory);
	private playerPlantsRepository = AppDataSource.getRepository(PlayerPlants);
	private spotRepository = AppDataSource.getRepository(Spot);

	// Hash verification to ensure the request is legitimate
	verifyTelegramData(
		telegramId: string,
		username: string,
		hash: string,
		data: string
	): boolean {
		console.log('Telegram Bot Token inside:', TELEGRAM_BOT_TOKEN);

		// Step 1: Create the secret_key from bot_token with "WebAppData"
		const secretKey = crypto
			.createHmac('sha256', Buffer.from('WebAppData'))
			.update(TELEGRAM_BOT_TOKEN)
			.digest();

		// Step 2: Construct data_check_string by filtering and sorting fields
		const dataCheckString = data;
		// const dataCheckString = Object.keys(data)
		// 	.filter((key) => key !== 'hash' && data[key]) // Exclude 'hash' and empty values
		// 	.sort()
		// 	.map((key) => `${key}=${data[key]}`)
		// 	.join('\n');

		console.log('dataCheckString:', dataCheckString);

		// Step 3: Calculate HMAC-SHA-256 hash of data_check_string with secret_key
		const calculatedHash = crypto
			.createHmac('sha256', secretKey)
			.update(dataCheckString)
			.digest('hex');

		console.log('calculatedHash:', calculatedHash);
		console.log('received hash:', hash);

		// Step 4: Compare calculated hash to received hash
		return calculatedHash === hash;
	}

	async createOrGetPlayer(telegramId: string): Promise<Player> {
		const player = await this.playerRepository.findOne({
			where: { telegramId: telegramId },
		});

		if (!player) {
			return await this.createPlayer(telegramId);
		} else {
			return player;
		}
	}

	// Create a player with 25 spots and a field
	async createPlayer(telegramId: string): Promise<Player> {
		const player = new Player();
		player.telegramId = telegramId;
		player.money = 1000;
		const savedPlayer = await this.playerRepository.save(player);

		const field = new Field();
		field.player = savedPlayer;
		field.size = 25;
		await this.fieldRepository.save(field);

		// Create 25 spots for the field with incremental costs
		for (let i = 0; i < 25; i++) {
			const spot = new Spot();
			spot.field = field;
			spot.spotNumber = i;
			spot.isOccupied = false;
			spot.isActive = i === 0; // Only the first spot is active by default
			spot.cost = 100 + i * 50; // Increment cost by 50 for each subsequent spot
			await this.spotRepository.save(spot);
		}

		return savedPlayer;
	}

	// Get player information along with full plant data in inventory
	async getPlayerInfo(playerId: string): Promise<any> {
		// Fetch the player and inventory details, including full plant details
		const player = await this.playerRepository.findOne({
			where: { id: playerId },
			relations: ['inventory', 'inventory.plant'], // Include inventory and plant details
		});

		if (!player) {
			throw new Error('Player not found');
		}

		// Format the inventory data to include the full plant entity
		const inventoryWithFullPlantInfo = player.inventory.map(
			(inventoryItem) => ({
				plant: inventoryItem.plant, // Full plant entity instead of just name
				amount: inventoryItem.amount,
				sellPrice: inventoryItem.plant.sellPrice, // Example of additional plant info
			})
		);

		return {
			id: player.id,
			name: player.telegramId,
			money: player.money,
			inventory: inventoryWithFullPlantInfo, // Inventory now includes full plant data
		};
	}

	// Get all plants in the game (available for unlocking)
	async getPlants(): Promise<Plant[]> {
		return await this.plantRepository.find();
	}

	// Get plants that are currently accessible to the player (unlocked plants)
	async getPlayerPlants(playerId: string): Promise<Plant[]> {
		const playerPlants = await this.playerPlantsRepository.find({
			where: { player: { id: playerId } },
			relations: ['plant'],
		});

		// Extract and return the unlocked plants
		return playerPlants.map((pp) => pp.plant);
	}

	// Unlock a plant for a player
	async unlockPlant(playerId: string, plantId: string): Promise<any> {
		const player = await this.playerRepository.findOne({
			where: { id: playerId },
		});

		if (!player) {
			throw new Error('Player not found');
		}

		const plant = await this.plantRepository.findOne({
			where: { id: plantId },
		});

		if (!plant) {
			throw new Error('Plant not found');
		}

		// Check if the player already has access to this plant
		const existingAccess = await this.playerPlantsRepository.findOne({
			where: { player: { id: playerId }, plant: { id: plantId } },
		});

		if (existingAccess) {
			throw new Error('Plant is already unlocked for this player.');
		}

		// Check if the player has enough money to unlock the plant
		if (player.money < plant.unlockPrice) {
			throw new Error(
				`Not enough money to unlock this plant. It costs ${plant.unlockPrice}`
			);
		}

		// Deduct the money and unlock the plant
		player.money -= plant.unlockPrice;

		// Save the player's updated balance
		await this.playerRepository.save(player);

		// Add a new record in PlayerPlants to unlock the plant
		const playerPlant = new PlayerPlants();
		playerPlant.player = player;
		playerPlant.plant = plant;
		await this.playerPlantsRepository.save(playerPlant);

		return { success: true, unlockedPlant: plant };
	}

	// Get field information (all spot details, including inactive ones)
	async getFieldInfo(playerId: string): Promise<any> {
		// Find the field associated with the player
		const field = await this.fieldRepository.findOne({
			where: { player: { id: playerId } },
			relations: ['spots', 'spots.plant'],
		});

		if (!field) {
			throw new Error('Field not found for the player');
		}

		// Return all spots associated with the field
		const spots = field.spots.map((spot) => ({
			spotNumber: spot.spotNumber,
			isActive: spot.isActive,
			isOccupied: spot.isOccupied,
			plant: spot.plant || null,
			timePlanted: spot.timePlanted,
			cost: spot.cost,
		}));

		return {
			fieldId: field.id,
			size: field.size,
			spots,
		};
	}

	// Plant on a particular spot
	async plantOnSpot(
		playerId: string,
		spotNumber: number,
		plantId: string
	): Promise<any> {
		// Find the field associated with the player
		const field = await this.fieldRepository.findOne({
			where: { player: { id: playerId } },
			relations: ['spots'],
		});

		if (!field) {
			throw new Error('Field not found for the player');
		}

		// Find the spot in the field
		const spot = field.spots.find((s) => s.spotNumber === spotNumber);

		if (!spot) {
			throw new Error('Spot not found in the field');
		}

		if (!spot.isActive) {
			throw new Error('This spot is not active. Unlock it first.');
		}

		if (spot.isOccupied) {
			throw new Error('Spot is already occupied.');
		}

		// Fetch the player and ensure the player exists
		const player = await this.playerRepository.findOne({
			where: { id: playerId },
		});

		if (!player) {
			throw new Error('Player not found');
		}

		// Check if the player has access to the plant
		const playerPlantAccess = await this.playerPlantsRepository.findOne({
			where: { player: { id: playerId }, plant: { id: plantId } },
			relations: ['plant'],
		});

		if (!playerPlantAccess) {
			throw new Error('Player does not have access to this plant.');
		}

		const plant = playerPlantAccess.plant;

		// Check if the player has enough money to plant this crop
		if (player.money < plant.cost) {
			throw new Error(
				`Not enough money to plant this crop. It costs ${plant.cost}.`
			);
		}

		// Deduct the planting cost from the player's money
		player.money -= plant.cost;

		// Save the player's updated money
		await this.playerRepository.save(player);

		// Plant the crop
		spot.plant = plant;
		spot.isOccupied = true;
		spot.timePlanted = new Date();

		await this.spotRepository.save(spot);

		return {
			success: true,
			spot,
			remainingMoney: player.money,
		};
	}

	// Harvest a particular spot
	async harvestSpot(playerId: string, spotNumber: number): Promise<any> {
		// Find the field associated with the player
		const field = await this.fieldRepository.findOne({
			where: { player: { id: playerId } },
			relations: ['spots', 'player'],
		});

		if (!field) {
			throw new Error('Field not found for the player');
		}

		// Find the spot in the field// Find the spot in the field, including the plant relation
		const spot = await this.spotRepository.findOne({
			where: { id: field.spots.find((s) => s.spotNumber === spotNumber)?.id },
			relations: ['plant'], // Explicitly load the plant relation
		});

		console.log(`Spot Details After Fetching: `, spot);

		if (!spot) {
			throw new Error('Spot not found in the field.');
		}

		// Log the spot details to troubleshoot
		console.log(`Spot Details: `, spot);

		// Check if the spot is occupied and has a plant
		if (!spot.isOccupied || !spot.plant) {
			throw new Error('No crop is planted in this spot.' + spot);
		}

		const plant = spot.plant;
		const timePlanted = spot.timePlanted ? new Date(spot.timePlanted) : null;

		if (!timePlanted) {
			throw new Error('No timePlanted value set for this spot.');
		}

		const timeElapsed = (new Date().getTime() - timePlanted.getTime()) / 1000; // Time in seconds

		if (timeElapsed < plant.growTime) {
			throw new Error('Crop is not ready for harvest.');
		}

		// Harvest the crop (clear the spot)
		spot.isOccupied = false;
		spot.plant = null;
		spot.timePlanted = null;

		await this.spotRepository.save(spot);

		// Add the harvested plant to the player's inventory
		const inventoryEntry = await this.inventoryRepository.findOne({
			where: { player: { id: playerId }, plant: { id: plant.id } },
			relations: ['plant', 'player'],
		});

		if (inventoryEntry) {
			// If the plant is already in the inventory, increase the quantity
			inventoryEntry.amount += 1;
			await this.inventoryRepository.save(inventoryEntry);
		} else {
			// If the plant is not in the inventory, add a new entry
			const newInventoryEntry = new Inventory();
			newInventoryEntry.player = field.player; // Player associated with the field
			newInventoryEntry.plant = plant; // Harvested plant
			newInventoryEntry.amount = 1; // Initial amount of 1
			await this.inventoryRepository.save(newInventoryEntry);
		}

		return { success: true, harvestedPlant: plant.name };
	}

	// Buy a new spot for the player
	async buyNewSpot(playerId: string): Promise<any> {
		const field = await this.fieldRepository.findOne({
			where: { player: { id: playerId } },
			relations: ['spots'],
		});

		if (!field) {
			throw new Error('Field not found for the player');
		}

		// Sort spots by spotNumber in ascending order
		field.spots.sort((a, b) => a.spotNumber - b.spotNumber);

		// Find the next inactive spot with the smallest spotNumber
		const nextSpot = field.spots.find((spot) => !spot.isActive);

		if (!nextSpot) {
			throw new Error('All spots are already active');
		}

		const player = await this.playerRepository.findOne({
			where: { id: playerId },
		});
		if (!player) {
			throw new Error('Player not found');
		}

		if (player.money < nextSpot.cost) {
			throw new Error(
				`Not enough money to unlock the next spot. It costs ${nextSpot.cost}.`
			);
		}

		// Deduct the cost and activate the next spot
		player.money -= nextSpot.cost;
		nextSpot.isActive = true;

		await this.spotRepository.save(nextSpot);
		await this.playerRepository.save(player);

		return { success: true, nextSpot };
	}

	async sellPlantsFromInventory(
		playerId: string,
		plantId: string,
		quantityToSell: number
	): Promise<any> {
		// Fetch the player and their inventory
		const player = await this.playerRepository.findOne({
			where: { id: playerId },
			relations: ['inventory', 'inventory.plant'], // Load inventory with plant details
		});

		if (!player) {
			throw new Error('Player not found');
		}

		// Find the plant in the player's inventory
		const inventoryEntry = player.inventory.find(
			(inv) => inv.plant.id === plantId
		);

		if (!inventoryEntry) {
			throw new Error('Plant not found in the player’s inventory.');
		}

		// Check if the player has enough of the plant to sell
		if (inventoryEntry.amount < quantityToSell) {
			throw new Error(
				`Not enough quantity to sell. You have ${inventoryEntry.amount} but tried to sell ${quantityToSell}.`
			);
		}

		// Calculate the total money gained from selling the plants
		const totalMoneyGained = inventoryEntry.plant.sellPrice * quantityToSell;

		// Deduct the quantity of plants being sold
		inventoryEntry.amount -= quantityToSell;

		// If the amount reaches zero, you can choose to remove the inventory entry (optional)
		if (inventoryEntry.amount === 0) {
			await this.inventoryRepository.remove(inventoryEntry); // Remove the entry if no plants left
		} else {
			// Save the updated inventory entry
			await this.inventoryRepository.save(inventoryEntry);
		}

		// Add the gained money to the player's balance
		player.money += totalMoneyGained;

		// Save the updated player balance
		await this.playerRepository.save(player);

		return {
			success: true,
			moneyGained: totalMoneyGained,
			remainingMoney: player.money,
			remainingAmount: inventoryEntry.amount,
		};
	}
}
