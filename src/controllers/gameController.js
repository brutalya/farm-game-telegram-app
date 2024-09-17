"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gameService_1 = __importDefault(require("../services/gameService"));
const errors_1 = require("../utils/errors");
class GameController {
    createPlayer(req, res) {
        try {
            const { playerId } = req.body;
            const newPlayer = gameService_1.default.createPlayer(playerId);
            res.status(201).json(newPlayer);
        }
        catch (error) {
            res.status(400).json({ message: this.getErrorMessage(error) });
        }
    }
    getPlayerState(req, res) {
        try {
            const { playerId } = req.params;
            const playerState = gameService_1.default.getPlayerState(playerId);
            res.status(200).json(playerState);
        }
        catch (error) {
            res.status(404).json({ message: this.getErrorMessage(error) });
        }
    }
    plantWheat(req, res) {
        try {
            const { playerId } = req.body;
            const success = gameService_1.default.plantWheat(playerId);
            res.status(200).json({ message: 'Wheat planted successfully' });
        }
        catch (error) {
            if (error instanceof errors_1.PlayerNotFoundError) {
                res.status(404).json({ message: error.message });
            }
            else if (error instanceof errors_1.InsufficientResourcesError) {
                res.status(400).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    }
    getErrorMessage(error) {
        if (error instanceof Error)
            return error.message;
        return String(error);
    }
}
exports.default = new GameController();
