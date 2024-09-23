// src/services/GameService.ts
import { GameState } from '../models/gamestate';
import { Plant } from '../models/plant';
import { Player } from '../models/player';

export class GameService {
	private gameState: GameState;

	constructor() {
		this.gameState = new GameState();
	}

	createPlayer(playerId: string): Player {
		const player = new Player(playerId);
		this.gameState.players.set(playerId, player);
		return player;
	}

	getPlayer(playerId: string): Player | undefined {
		return this.gameState.players.get(playerId);
	}

	plantCrop(playerId: string, plantId: string): boolean {
		const player = this.getPlayer(playerId);
		const plant = this.gameState.plants.get(plantId);

		if (!player || !plant) return false;

		const emptySpot = player.field.spots.findIndex((spot) => spot === null);
		if (emptySpot === -1 || player.money < plant.cost) return false;

		player.money -= plant.cost;
		player.field.spots[emptySpot] = plant;
		player.field.plantingTimes[emptySpot] = Date.now();

		return true;
	}

	harvestCrop(playerId: string, spotIndex: number): boolean {
		const player = this.getPlayer(playerId);
		if (!player) return false;

		const plant = player.field.spots[spotIndex];
		const plantingTime = player.field.plantingTimes[spotIndex];

		if (!plant || !plantingTime) return false;

		const currentTime = Date.now();
		if (currentTime - plantingTime < plant.growTime * 1000) return false;

		player.field.spots[spotIndex] = null;
		player.field.plantingTimes[spotIndex] = null;

		const currentAmount = player.inventory.get(plant.id) || 0;
		player.inventory.set(plant.id, currentAmount + 1);

		return true;
	}

	sellCrop(playerId: string, plantId: string, amount: number): boolean {
		const player = this.getPlayer(playerId);
		const plant = this.gameState.plants.get(plantId);

		if (!player || !plant) return false;

		const inventoryAmount = player.inventory.get(plantId) || 0;
		if (inventoryAmount < amount) return false;

		player.inventory.set(plantId, inventoryAmount - amount);
		player.money += plant.sellPrice * amount;

		return true;
	}

	getFieldInfo(playerId: string): any {
		const player = this.getPlayer(playerId);
		if (!player) return null;

		return {
			crops: player.field.spots.map((plant, index) => ({
				plant: plant ? plant.name : null,
				timeLeft: plant
					? Math.max(
							0,
							plant.growTime -
								(Date.now() - (player.field.plantingTimes[index] || 0)) / 1000
					  )
					: null,
				isReady: plant
					? (Date.now() - (player.field.plantingTimes[index] || 0)) / 1000 >=
					  plant.growTime
					: false,
			})),
			freeSpots: player.field.spots.filter((spot) => spot === null).length,
		};
	}

	getPlayerInfo(playerId: string): any {
		const player = this.getPlayer(playerId);
		if (!player) return null;

		return {
			money: player.money,
			inventory: Array.from(player.inventory.entries()).map(
				([plantId, amount]) => ({
					plant: this.gameState.plants.get(plantId)?.name,
					amount,
				})
			),
		};
	}
}
