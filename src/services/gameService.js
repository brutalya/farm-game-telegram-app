"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
// src/services/GameService.ts
const gamestate_1 = require("../models/gamestate");
const player_1 = require("../models/player");
class GameService {
    constructor() {
        this.gameState = new gamestate_1.GameState();
    }
    createPlayer(playerId) {
        const player = new player_1.Player(playerId);
        this.gameState.players.set(playerId, player);
        return player;
    }
    getPlayer(playerId) {
        return this.gameState.players.get(playerId);
    }
    plantCrop(playerId, plantId) {
        const player = this.getPlayer(playerId);
        const plant = this.gameState.plants.get(plantId);
        if (!player || !plant)
            return false;
        const emptySpot = player.field.spots.findIndex((spot) => spot === null);
        if (emptySpot === -1 || player.money < plant.cost)
            return false;
        player.money -= plant.cost;
        player.field.spots[emptySpot] = plant;
        player.field.plantingTimes[emptySpot] = Date.now();
        return true;
    }
    harvestCrop(playerId, spotIndex) {
        const player = this.getPlayer(playerId);
        if (!player)
            return false;
        const plant = player.field.spots[spotIndex];
        const plantingTime = player.field.plantingTimes[spotIndex];
        if (!plant || !plantingTime)
            return false;
        const currentTime = Date.now();
        if (currentTime - plantingTime < plant.growTime * 1000)
            return false;
        player.field.spots[spotIndex] = null;
        player.field.plantingTimes[spotIndex] = null;
        const currentAmount = player.inventory.get(plant.id) || 0;
        player.inventory.set(plant.id, currentAmount + 1);
        return true;
    }
    sellCrop(playerId, plantId, amount) {
        const player = this.getPlayer(playerId);
        const plant = this.gameState.plants.get(plantId);
        if (!player || !plant)
            return false;
        const inventoryAmount = player.inventory.get(plantId) || 0;
        if (inventoryAmount < amount)
            return false;
        player.inventory.set(plantId, inventoryAmount - amount);
        player.money += plant.sellPrice * amount;
        return true;
    }
    getFieldInfo(playerId) {
        const player = this.getPlayer(playerId);
        if (!player)
            return null;
        return {
            crops: player.field.spots.map((plant, index) => ({
                plant: plant ? plant.name : null,
                timeLeft: plant
                    ? Math.max(0, plant.growTime -
                        (Date.now() - (player.field.plantingTimes[index] || 0)) / 1000)
                    : null,
                isReady: plant
                    ? (Date.now() - (player.field.plantingTimes[index] || 0)) / 1000 >=
                        plant.growTime
                    : false,
            })),
            freeSpots: player.field.spots.filter((spot) => spot === null).length,
        };
    }
    getPlayerInfo(playerId) {
        const player = this.getPlayer(playerId);
        if (!player)
            return null;
        return {
            money: player.money,
            inventory: Array.from(player.inventory.entries()).map(([plantId, amount]) => {
                var _a;
                return ({
                    plant: (_a = this.gameState.plants.get(plantId)) === null || _a === void 0 ? void 0 : _a.name,
                    amount,
                });
            }),
        };
    }
}
exports.GameService = GameService;
