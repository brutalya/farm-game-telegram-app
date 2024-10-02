"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
// src/services/GameService.ts
const database_1 = require("../config/database");
const Field_1 = require("../entities/Field");
const Inventory_1 = require("../entities/Inventory");
const Plant_1 = require("../entities/Plant");
const Player_1 = require("../entities/Player");
class GameService {
    constructor() {
        this.playerRepository = database_1.AppDataSource.getRepository(Player_1.Player);
        this.fieldRepository = database_1.AppDataSource.getRepository(Field_1.Field);
        this.plantRepository = database_1.AppDataSource.getRepository(Plant_1.Plant);
        this.inventoryRepository = database_1.AppDataSource.getRepository(Inventory_1.Inventory);
    }
    createPlayer(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = new Player_1.Player();
            player.id = playerId;
            player.money = 100;
            const field = new Field_1.Field();
            field.tier = 1;
            field.size = 10;
            field.spots = Array(10).fill(null);
            field.plantingTimes = Array(10).fill(null);
            player.field = field;
            yield this.playerRepository.save(player);
            return player;
        });
    }
    getPlayer(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.playerRepository.findOne({
                where: { id: playerId },
                relations: ['field', 'inventory'],
            });
        });
    }
    plantCrop(playerId, plantId) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = yield this.getPlayer(playerId);
            const plant = yield this.plantRepository.findOne({
                where: { id: plantId },
            });
            if (!player || !plant)
                return false;
            const emptySpot = player.field.spots.findIndex((spot) => spot === null);
            if (emptySpot === -1 || player.money < plant.cost)
                return false;
            player.money -= plant.cost;
            player.field.spots[emptySpot] = plant.id;
            player.field.plantingTimes[emptySpot] = Date.now();
            yield this.playerRepository.save(player);
            return true;
        });
    }
    harvestCrop(playerId, spotIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = yield this.getPlayer(playerId);
            if (!player)
                return false;
            const plantId = player.field.spots[spotIndex];
            const plantingTime = player.field.plantingTimes[spotIndex];
            if (!plantId || !plantingTime)
                return false;
            const plant = yield this.plantRepository.findOne({
                where: { id: plantId },
            });
            if (!plant)
                return false;
            const currentTime = Date.now();
            if (currentTime - plantingTime < plant.growTime * 1000)
                return false;
            player.field.spots[spotIndex] = null;
            player.field.plantingTimes[spotIndex] = null;
            let inventory = yield this.inventoryRepository.findOne({
                where: { player: { id: player.id }, plant: { id: plant.id } },
            });
            if (!inventory) {
                inventory = new Inventory_1.Inventory();
                inventory.player = player;
                inventory.plant = plant;
                inventory.amount = 0;
            }
            inventory.amount += 1;
            yield this.inventoryRepository.save(inventory);
            yield this.playerRepository.save(player);
            return true;
        });
    }
    sellCrop(playerId, plantId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = yield this.getPlayer(playerId);
            const plant = yield this.plantRepository.findOne({
                where: { id: plantId },
            });
            if (!player || !plant)
                return false;
            const inventory = yield this.inventoryRepository.findOne({
                where: { player: { id: player.id }, plant: { id: plant.id } },
            });
            if (!inventory || inventory.amount < amount)
                return false;
            inventory.amount -= amount;
            player.money += plant.sellPrice * amount;
            yield this.inventoryRepository.save(inventory);
            yield this.playerRepository.save(player);
            return true;
        });
    }
    getFieldInfo(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = yield this.getPlayer(playerId);
            if (!player)
                return null;
            const fieldInfo = yield Promise.all(player.field.spots.map((spotPlantId, index) => __awaiter(this, void 0, void 0, function* () {
                if (!spotPlantId)
                    return { plant: null, timeLeft: null, isReady: false };
                const plant = yield this.plantRepository.findOne({
                    where: { id: spotPlantId },
                });
                const plantingTime = player.field.plantingTimes[index];
                if (!plant || !plantingTime)
                    return { plant: null, timeLeft: null, isReady: false };
                const timeLeft = Math.max(0, plant.growTime - (Date.now() - plantingTime) / 1000);
                const isReady = timeLeft === 0;
                return {
                    plant: plant.name,
                    timeLeft,
                    isReady,
                };
            })));
            return {
                crops: fieldInfo,
                freeSpots: fieldInfo.filter((spot) => spot.plant === null).length,
            };
        });
    }
    getPlayerInfo(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = yield this.getPlayer(playerId);
            if (!player)
                return null;
            const inventoryInfo = yield Promise.all(player.inventory.map((inv) => __awaiter(this, void 0, void 0, function* () {
                const plant = yield this.plantRepository.findOne({
                    where: { id: inv.plant.id },
                });
                return {
                    plant: plant === null || plant === void 0 ? void 0 : plant.name,
                    amount: inv.amount,
                };
            })));
            return {
                money: player.money,
                inventory: inventoryInfo,
            };
        });
    }
}
exports.GameService = GameService;
