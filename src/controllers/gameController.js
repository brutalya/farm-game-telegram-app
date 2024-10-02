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
exports.GameController = void 0;
const gameService_1 = require("../services/gameService");
class GameController {
    constructor() {
        this.createPlayer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { playerId } = req.body;
            try {
                const player = yield this.gameService.createPlayer(playerId);
                res.json(player);
            }
            catch (error) {
                res.status(500).json({ error: 'Error creating player' });
            }
        });
        this.plantCrop = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { playerId, plantId } = req.body;
            try {
                const success = yield this.gameService.plantCrop(playerId, plantId);
                res.json({ success });
            }
            catch (error) {
                res.status(500).json({ error: 'Error planting crop' });
            }
        });
        this.harvestCrop = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { playerId, spotIndex } = req.body;
            try {
                const success = yield this.gameService.harvestCrop(playerId, spotIndex);
                res.json({ success });
            }
            catch (error) {
                res.status(500).json({ error: 'Error harvesting crop' });
            }
        });
        this.sellCrop = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { playerId, plantId, amount } = req.body;
            try {
                const success = yield this.gameService.sellCrop(playerId, plantId, amount);
                res.json({ success });
            }
            catch (error) {
                res.status(500).json({ error: 'Error selling crop' });
            }
        });
        this.getFieldInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { playerId } = req.params;
            try {
                const fieldInfo = yield this.gameService.getFieldInfo(playerId);
                res.json(fieldInfo);
            }
            catch (error) {
                res.status(500).json({ error: 'Error getting field info' });
            }
        });
        this.getPlayerInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { playerId } = req.params;
            try {
                const playerInfo = yield this.gameService.getPlayerInfo(playerId);
                res.json(playerInfo);
            }
            catch (error) {
                res.status(500).json({ error: 'Error getting player info' });
            }
        });
        this.gameService = new gameService_1.GameService();
    }
}
exports.GameController = GameController;
