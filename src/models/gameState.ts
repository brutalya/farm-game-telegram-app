import { Plant } from '../models/plant';
import { Player } from '../models/player';

// src/models/GameState.ts
export class GameState {
	players: Map<string, Player>;
	plants: Map<string, Plant>;

	constructor() {
		this.players = new Map();
		this.plants = new Map();
		this.initializePlants();
	}

	private initializePlants() {
		const carrot = new Plant('carrot', 'Carrot', 1, 5, 10, 60); // 60 seconds grow time
		const wheat = new Plant('wheat', 'Wheat', 1, 3, 7, 45); // 45 seconds grow time
		this.plants.set(carrot.id, carrot);
		this.plants.set(wheat.id, wheat);
	}
}
