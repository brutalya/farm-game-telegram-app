"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const gameService_1 = require("../services/gameService");
class GameController {
    constructor() {
        this.createPlayer = (req, res) => {
            const { playerId } = req.body;
            const player = this.gameService.createPlayer(playerId);
            res.json(player);
        };
        this.plantCrop = (req, res) => {
            const { playerId, plantId } = req.body;
            const success = this.gameService.plantCrop(playerId, plantId);
            res.json({ success });
        };
        this.harvestCrop = (req, res) => {
            const { playerId, spotIndex } = req.body;
            const success = this.gameService.harvestCrop(playerId, spotIndex);
            res.json({ success });
        };
        this.sellCrop = (req, res) => {
            const { playerId, plantId, amount } = req.body;
            const success = this.gameService.sellCrop(playerId, plantId, amount);
            res.json({ success });
        };
        this.getFieldInfo = (req, res) => {
            const { playerId } = req.params;
            const fieldInfo = this.gameService.getFieldInfo(playerId);
            res.json(fieldInfo);
        };
        this.getPlayerInfo = (req, res) => {
            const { playerId } = req.params;
            const playerInfo = this.gameService.getPlayerInfo(playerId);
            res.json(playerInfo);
        };
        this.gameService = new gameService_1.GameService();
    }
}
exports.GameController = GameController;
