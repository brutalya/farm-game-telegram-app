// src/services/gameService.ts
import { Facility } from '../models/facility';
import { GameState } from '../models/gameState';
import { Player } from '../models/player';
import { Process } from '../models/process';
import { Resource } from '../models/resource';
import {
	InsufficientResourcesError,
	PlayerNotFoundError,
} from '../utils/errors';

class GameService {
	private gameState: GameState;

	constructor() {
		this.gameState = this.initializeGameState();
	}

	private initializeGameState(): GameState {
		return {
			players: {},
			resources: {
				wheat: {
					id: 'wheat',
					type: 'crop',
					name: 'Wheat',
					properties: { growthTime: 60 },
				},
			},
			facilities: {
				field: {
					id: 'field',
					type: 'production',
					name: 'Field',
					capacity: 1,
					processes: ['plantWheat'],
					upgrades: [],
				},
			},
			processes: {
				plantWheat: {
					id: 'plantWheat',
					name: 'Plant Wheat',
					inputs: [{ resourceId: 'wheat', quantity: 1 }],
					outputs: [{ resourceId: 'wheat', quantity: 2 }],
					duration: 60,
					successProbability: 1,
				},
			},
		};
	}

	public createPlayer(playerId: string): Player {
		if (this.gameState.players[playerId]) {
			throw new Error('Player already exists');
		}
		const newPlayer: Player = {
			id: playerId,
			resources: { wheat: 10 },
			facilities: ['field'],
			currency: 100,
		};
		this.gameState.players[playerId] = newPlayer;
		return newPlayer;
	}

	public getPlayerState(playerId: string): Player {
		const player = this.gameState.players[playerId];
		if (!player) {
			throw new PlayerNotFoundError(playerId);
		}
		return player;
	}

	public plantWheat(playerId: string): boolean {
		const player = this.gameState.players[playerId];
		if (!player) {
			throw new PlayerNotFoundError(playerId);
		}
		if (player.resources['wheat'] < 1) {
			throw new InsufficientResourcesError('wheat');
		}
		player.resources['wheat'] -= 1;
		setTimeout(() => this.harvestWheat(playerId), 60000); // 60 seconds for testing
		return true;
	}

	private harvestWheat(playerId: string): void {
		const player = this.gameState.players[playerId];
		if (!player) {
			return;
		}
		player.resources['wheat'] = (player.resources['wheat'] || 0) + 2;
	}
}

export default new GameService();
