// src/services/GameService.ts
import { AppDataSource } from '../config/database';
import { Field } from '../entities/Field';
import { Inventory } from '../entities/Inventory';
import { Plant } from '../entities/Plant';
import { Player } from '../entities/Player';
import { Spot } from '../entities/Spot';

export class GameService {
	private playerRepository = AppDataSource.getRepository(Player);
	private fieldRepository = AppDataSource.getRepository(Field);
	private plantRepository = AppDataSource.getRepository(Plant);
	private inventoryRepository = AppDataSource.getRepository(Inventory);

	async createPlayer(playerId: string): Promise<Player> {
		const player = new Player();
		player.name = playerId;
		player.money = 100;

		const field = new Field();
		field.tier = 1;
		field.size = 10;
		field.spots = [];

		// for (let i = 0; i < field.size; i++) {
		// 	const spot = new Spot();
		// 	spot.status = 'free';
		// 	spot.plantingTime = null;
		// 	spot.harvestTime = null;
		// 	field.spots.push(spot);
		// }

		player.field = field;
		await this.playerRepository.save(player);
		return player;
	}

	async getPlayer(playerId: string): Promise<Player | null> {
		return this.playerRepository.findOne({
			where: { name: playerId },
			relations: ['field', 'inventory'],
		});
	}

	async createPlant(
		plant_name: string,
		tier: number,
		cost: number,
		sellPrice: number,
		growTime: number
	): Promise<Plant> {
		const plant = new Plant();
		plant.name = plant_name;
		plant.tier = tier;
		plant.cost = cost;
		plant.sellPrice = sellPrice;
		plant.growTime = growTime;

		await this.plantRepository.save(plant);
		return plant;
	}

	async plantCrop(playerId: string, plantId: string): Promise<boolean> {
		try {
			// Find the player and make sure the field and inventory relationships are loaded
			const player = await this.playerRepository.findOne({
				where: { name: playerId },
				relations: ['field', 'inventory'],
			});

			// Check if the player exists
			if (!player) {
				console.error('Player not found');
				return false;
			}

			// Find the plant by its name (or ID) and check if it exists
			const plant = await this.plantRepository.findOne({
				where: { name: plantId },
			});

			// Check if the plant exists
			if (!plant) {
				console.error('Plant not found');
				return false;
			}

			// Get the number of occupied spots
			const occupiedSpotsCount = await AppDataSource.getRepository(Spot)
				.createQueryBuilder('spot')
				.where('spot.fieldId = :fieldId', { fieldId: player.field.id })
				.andWhere('spot.status = :status', { status: 'planted' })
				.getCount();

			// Check if there are free spots available
			if (occupiedSpotsCount >= player.field.size) {
				console.error('No free spots available');
				return false;
			}

			// Check if the player has enough money to plant the crop
			if (player.money < plant.cost) {
				console.error('Not enough money to plant the crop');
				return false;
			}

			// Deduct money from the player
			player.money -= plant.cost;

			// Create a new Spot entity
			const spot = new Spot();
			spot.field = player.field;
			spot.plant = plant;
			spot.plantingTime = Date.now();
			spot.status = 'planted';
			spot.harvestTime = null;

			// Save the new Spot entity and update the player
			await AppDataSource.getRepository(Spot).save(spot);
			await this.playerRepository.save(player);

			return true;
		} catch (error) {
			console.error('Error planting crop:', error);
			throw error;
		}
	}

	async harvestCrop(playerId: string, spotId: number): Promise<boolean> {
		const player = await this.getPlayer(playerId);
		if (!player) return false;

		// Find the spot by id
		const spot = await AppDataSource.getRepository(Spot).findOne({
			where: { id: spotId, field: { id: player.field.id }, status: 'planted' },
			relations: ['plant'],
		});

		if (!spot || !spot.plantingTime) return false;

		const plant = spot.plant;
		const currentTime = Date.now();

		// Check if the plant has finished growing
		if (currentTime - spot.plantingTime < plant.growTime * 1000) return false;

		// Update spot status to harvested
		spot.status = 'harvested';
		spot.harvestTime = currentTime;

		// Add the harvested plant to the player's inventory
		let inventory = await this.inventoryRepository.findOne({
			where: { player: { id: player.id }, plant: { id: plant.id } },
		});

		if (!inventory) {
			inventory = new Inventory();
			inventory.player = player;
			inventory.plant = plant;
			inventory.amount = 0;
		}

		inventory.amount += 1;

		await this.inventoryRepository.save(inventory);
		await AppDataSource.getRepository(Spot).save(spot);

		return true;
	}

	async harvestByPlantName(
		playerId: string,
		plantName: string
	): Promise<boolean> {
		try {
			const player = await this.playerRepository.findOne({
				where: { name: playerId },
				relations: ['field', 'inventory'],
			});

			if (!player) {
				console.error('Player not found');
				return false;
			}

			const plant = await this.plantRepository.findOne({
				where: { name: plantName },
			});

			if (!plant) {
				console.error('Plant not found');
				return false;
			}

			// Find all spots in the player's field that are planted with this plant
			const plantedSpots = await AppDataSource.getRepository(Spot)
				.createQueryBuilder('spot')
				.where('spot.fieldId = :fieldId', { fieldId: player.field.id })
				.andWhere('spot.plantId = :plantId', { plantId: plant.id })
				.andWhere('spot.status = :status', { status: 'planted' })
				.getMany();

			if (plantedSpots.length === 0) {
				console.error('No crops to harvest');
				return false;
			}

			let harvestedCount = 0;

			for (const spot of plantedSpots) {
				const currentTime = Date.now();

				// Ensure plantingTime is not null before proceeding
				if (
					spot.plantingTime !== null &&
					currentTime - spot.plantingTime >= plant.growTime * 1000
				) {
					// Update spot status to harvested
					spot.status = 'harvested';
					spot.harvestTime = currentTime;
					await AppDataSource.getRepository(Spot).save(spot);

					harvestedCount++;
				}
			}

			// Check if any crops were successfully harvested
			if (harvestedCount === 0) {
				console.error('No crops ready for harvest');
				return false;
			}

			// Add the harvested crops to the player's inventory
			let inventory = await this.inventoryRepository.findOne({
				where: { player: { id: player.id }, plant: { id: plant.id } },
			});

			if (!inventory) {
				inventory = new Inventory();
				inventory.player = player;
				inventory.plant = plant;
				inventory.amount = 0;
			}

			inventory.amount += harvestedCount;

			await this.inventoryRepository.save(inventory);
			await this.playerRepository.save(player);

			return true;
		} catch (error) {
			console.error('Error harvesting crops:', error);
			throw error;
		}
	}

	async getFreeSpots(fieldId: number): Promise<number> {
		const totalSpots = await this.fieldRepository.findOne({
			where: { id: fieldId },
		});

		if (!totalSpots) return 0;

		const occupiedSpotsCount = await AppDataSource.getRepository(Spot)
			.createQueryBuilder('spot')
			.where('spot.fieldId = :fieldId', { fieldId })
			.andWhere('spot.status = :status', { status: 'planted' })
			.getCount();

		return totalSpots.size - occupiedSpotsCount;
	}

	async sellCrop(
		playerId: string,
		plantId: string,
		amount: number
	): Promise<boolean> {
		const player = await this.getPlayer(playerId);
		const plant = await this.plantRepository.findOne({
			where: { name: plantId },
		});

		if (!player || !plant) return false;

		const inventory = await this.inventoryRepository.findOne({
			where: { player: { id: player.id }, plant: { id: plant.id } },
		});
		if (!inventory || inventory.amount < amount) return false;

		inventory.amount -= amount;
		player.money += plant.sellPrice * amount;

		await this.inventoryRepository.save(inventory);
		await this.playerRepository.save(player);

		return true;
	}

	async getFieldInfo(playerId: string): Promise<any> {
		const player = await this.getPlayer(playerId);
		if (!player) return null;

		// Find all planted spots in the player's field
		const plantedSpots = await AppDataSource.getRepository(Spot)
			.createQueryBuilder('spot')
			.where('spot.fieldId = :fieldId', { fieldId: player.field.id })
			.andWhere('spot.status = :status', { status: 'planted' })
			.leftJoinAndSelect('spot.plant', 'plant') // To include the plant details
			.getMany();

		// Calculate free spots: total size minus planted spots count
		const totalSpots = player.field.size;
		const plantedSpotsCount = plantedSpots.length;
		const freeSpotsCount = totalSpots - plantedSpotsCount;

		// Map the planted spots to return their details
		const fieldInfo = plantedSpots.map((spot) => {
			const plant = spot.plant ? spot.plant.name : null;
			const timeLeft = spot.plantingTime
				? Math.max(
						0,
						spot.plant.growTime * 1000 - (Date.now() - spot.plantingTime)
				  )
				: null;
			const isReady = timeLeft === 0;

			return {
				plant,
				plantingTime: spot.plantingTime,
				timeLeft,
				isReady,
			};
		});

		return {
			crops: fieldInfo,
			plantedSpots: plantedSpotsCount,
			freeSpots: freeSpotsCount,
		};
	}

	async getPlayerInfo(playerId: string): Promise<any> {
		const player = await this.getPlayer(playerId);
		if (!player) return null;

		const inventory = await this.inventoryRepository.find({
			where: { player: { id: player.id } }, // Find all inventory for the player
			relations: ['plant'], // Include the related plant
		});

		const inventoryInfo = inventory.map((inv) => ({
			plant: inv.plant.name,
			amount: inv.amount,
		}));

		return {
			money: player.money,
			inventory: inventoryInfo,
		};
	}
}
