"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../utils/errors");
class GameService {
    constructor() {
        this.gameState = this.initializeGameState();
    }
    initializeGameState() {
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
    createPlayer(playerId) {
        if (this.gameState.players[playerId]) {
            throw new Error('Player already exists');
        }
        const newPlayer = {
            id: playerId,
            resources: { wheat: 10 },
            facilities: ['field'],
            currency: 100,
        };
        this.gameState.players[playerId] = newPlayer;
        return newPlayer;
    }
    getPlayerState(playerId) {
        const player = this.gameState.players[playerId];
        if (!player) {
            throw new errors_1.PlayerNotFoundError(playerId);
        }
        return player;
    }
    plantWheat(playerId) {
        const player = this.gameState.players[playerId];
        if (!player) {
            throw new errors_1.PlayerNotFoundError(playerId);
        }
        if (player.resources['wheat'] < 1) {
            throw new errors_1.InsufficientResourcesError('wheat');
        }
        player.resources['wheat'] -= 1;
        setTimeout(() => this.harvestWheat(playerId), 60000); // 60 seconds for testing
        return true;
    }
    harvestWheat(playerId) {
        const player = this.gameState.players[playerId];
        if (!player) {
            return;
        }
        player.resources['wheat'] = (player.resources['wheat'] || 0) + 2;
    }
}
exports.default = new GameService();
