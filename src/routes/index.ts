// src/routes/index.ts
import { Router } from 'express';
import { GameController } from '../controllers/gameController';

const router = Router();
const gameController = new GameController();

router.post('/players', gameController.createPlayer);
router.post('/plant', gameController.plantCrop);
router.post('/plant/new', gameController.createPlant);
router.post('/harvest', gameController.harvestCrop);
router.post('/harvestplant', gameController.harvestCrop);
router.post('/sell', gameController.sellCrop);
router.get('/field/:playerId', gameController.getFieldInfo);
router.get('/player/:playerId', gameController.getPlayerInfo);

export default router;
