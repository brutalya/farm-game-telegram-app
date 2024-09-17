"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const gameController_1 = __importDefault(require("../controllers/gameController"));
const router = (0, express_1.Router)();
router.post('/players', gameController_1.default.createPlayer);
router.get('/players/:playerId', gameController_1.default.getPlayerState);
router.post('/plant-wheat', gameController_1.default.plantWheat);
exports.default = router;
