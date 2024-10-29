// src/routes/index.ts
import { Router } from 'express';
import { authenticateToken } from '../authMiddleware';
import { GameController } from '../controllers/gameController';

const router = Router();
const gameController = new GameController();

// Auth route for player login or creation
router.post('/auth/login', gameController.loginOrCreatePlayer);
router.post('/auth/telegram', gameController.authTG);

// router.post('/players', gameController.createPlayer); // Create a player

//common gets
router.get('/plants', gameController.getPlants); // Get all plants in the game

//gets
router.get('/player-plants', authenticateToken, gameController.getPlayerPlants); // Get unlocked plants for a player
router.get('/player', authenticateToken, gameController.getPlayerInfoAuth); // Get player info
router.get('/field', authenticateToken, gameController.getFieldInfo); // Get field info (spots)
//posts
router.post('/unlock-plant', authenticateToken, gameController.unlockPlant); // Unlock a plant for the player
router.post('/plant', authenticateToken, gameController.plantOnSpot); // Plant on a spot
router.post('/harvest', authenticateToken, gameController.harvestSpot); // Harvest a spot
router.post('/buy-spot', authenticateToken, gameController.buyNewSpot); // Buy a new spot
router.post('/sell-plants', authenticateToken, gameController.sellPlants); // Sell plants from inventory

export default router;
