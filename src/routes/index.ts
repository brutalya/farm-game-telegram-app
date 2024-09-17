// src/routes/index.ts
import { Router } from 'express';
import gameController from '../controllers/gameController';

const router = Router();

router.post('/players', gameController.createPlayer);
router.get('/players/:playerId', gameController.getPlayerState);
router.post('/plant-wheat', gameController.plantWheat);

export default router;
