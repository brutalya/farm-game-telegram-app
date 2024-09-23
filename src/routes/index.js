"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const gameController_1 = require("../controllers/gameController");
const router = (0, express_1.Router)();
const gameController = new gameController_1.GameController();
router.post('/players', gameController.createPlayer);
router.post('/plant', gameController.plantCrop);
router.post('/harvest', gameController.harvestCrop);
router.post('/sell', gameController.sellCrop);
router.get('/field/:playerId', gameController.getFieldInfo);
router.get('/player/:playerId', gameController.getPlayerInfo);
exports.default = router;
