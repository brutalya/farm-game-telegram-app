import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../authMiddleware';
import { GameService } from '../services/gameService';

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

console.log(JWT_SECRET);

export class GameController {
	private gameService: GameService;

	constructor() {
		this.gameService = new GameService();
	}

	authTG = async (req: Request, res: Response) => {
		const { id: telegramId, username, hash, ...data } = req.body;
		console.log('Login payload:', telegramId, username, hash, data);
		console.log('req:', req);

		try {
			// Convert `data` to `Record<string, string>` by filtering and mapping
			const stringData: Record<string, string> = Object.keys(data)
				.filter((key) => typeof data[key] === 'string')
				.reduce((acc, key) => {
					acc[key] = data[key] as string;
					return acc;
				}, {} as Record<string, string>);

			// Step 1: Verify that the request is valid using Telegram hash
			const isVerified = this.gameService.verifyTelegramData(
				telegramId as string,
				username as string,
				hash as string,
				stringData
			);
			if (!isVerified) {
				return res.status(403).json({ message: 'Unauthorized access' });
			}

			// Step 2: Use the gameService to create or get the player
			const player = await this.gameService.createOrGetPlayer(
				telegramId as string
			);

			// Step 3: Generate a JWT token for the player
			const token = jwt.sign(
				{ playerId: player.id, role: 'player' },
				JWT_SECRET,
				{ expiresIn: '24h' }
			);

			res.json({ token });
		} catch (error) {
			console.error('Error authenticating Telegram user:', error);
			res.status(500).json({ message: 'Internal server error' });
		}
	};

	loginOrCreatePlayer = async (req: Request, res: Response) => {
		const { telegramId } = req.body;
		try {
			console.log(telegramId);
			const player = await this.gameService.createOrGetPlayer(telegramId);

			// Generate a JWT token
			const token = jwt.sign(
				{ playerId: player.id, role: 'player' },
				JWT_SECRET,
				{ expiresIn: '24h' }
			);
			res.json({ token: token });
		} catch (error) {
			const errorMessage = (error as Error).message;
			res.status(500).json({ error: errorMessage });
		}
	};

	// POST: Create a player
	createPlayer = async (req: Request, res: Response) => {
		console.log(`start`);
		const { telegramId } = req.body;
		try {
			console.log(telegramId);
			const player = await this.gameService.createPlayer(telegramId);
			res.json(player);
		} catch (error) {
			const errorMessage = (error as Error).message;
			res.status(500).json({ error: errorMessage });
		}
	};

	// GET: Get player info
	getPlayerInfo = async (req: Request, res: Response) => {
		const { playerId } = req.params;
		try {
			const playerInfo = await this.gameService.getPlayerInfo(playerId);
			res.json(playerInfo);
		} catch (error) {
			const errorMessage = (error as Error).message;
			res.status(500).json({ error: errorMessage });
		}
	};

	getPlayerInfoAuth = async (req: AuthenticatedRequest, res: Response) => {
		const playerId = req.player?.playerId || ''; // Extract playerId from the JWT in req.player

		try {
			const playerInfo = await this.gameService.getPlayerInfo(playerId); // Pass playerId from JWT to the service
			res.json(playerInfo);
		} catch (error) {
			const errorMessage = (error as Error).message;
			res.status(500).json({ error: errorMessage });
		}
	};

	// GET: Get all plants in the game
	getPlants = async (req: Request, res: Response) => {
		try {
			const plants = await this.gameService.getPlants();
			res.json(plants);
		} catch (error) {
			const errorMessage = (error as Error).message;
			res.status(500).json({ error: errorMessage });
		}
	};

	// GET: Get unlocked plants for a player
	getPlayerPlants = async (req: AuthenticatedRequest, res: Response) => {
		const playerId = req.player?.playerId || '';
		try {
			const plants = await this.gameService.getPlayerPlants(playerId);
			res.json(plants);
		} catch (error) {
			const errorMessage = (error as Error).message;
			res.status(500).json({ error: errorMessage });
		}
	};

	// GET: Get field info (spot details)
	getFieldInfo = async (req: AuthenticatedRequest, res: Response) => {
		const playerId = req.player?.playerId || '';
		try {
			const fieldInfo = await this.gameService.getFieldInfo(playerId);
			res.json(fieldInfo);
		} catch (error) {
			const errorMessage = (error as Error).message;
			res.status(500).json({ error: errorMessage });
		}
	};

	// POST: Unlock a plant for the player
	unlockPlant = async (req: AuthenticatedRequest, res: Response) => {
		const playerId = req.player?.playerId || '';
		const plantId = req.body.plantId;
		//const { playerId, plantId } = req.body;
		try {
			const result = await this.gameService.unlockPlant(playerId, plantId);
			res.json(result);
		} catch (error) {
			const errorMessage = (error as Error).message;
			res.status(500).json({ error: errorMessage });
		}
	};

	// POST: Plant on a spot
	plantOnSpot = async (req: AuthenticatedRequest, res: Response) => {
		const playerId = req.player?.playerId || '';
		const spotNumber = req.body.spotNumber; // Access directly from req.body
		const plantId = req.body.plantId; // Access directly from req.body
		console.log('plant on spot: ', playerId, spotNumber, plantId);
		try {
			const result = await this.gameService.plantOnSpot(
				playerId,
				spotNumber,
				plantId
			);
			res.json(result);
		} catch (error) {
			const errorMessage = (error as Error).message;
			res.status(500).json({ error: errorMessage });
		}
	};

	// POST: Harvest a spot
	harvestSpot = async (req: AuthenticatedRequest, res: Response) => {
		const playerId = req.player?.playerId || '';
		const spotNumber = req.body.spotNumber; // Access directly from req.body
		console.log('harvest on spot: ', playerId, spotNumber);
		try {
			const result = await this.gameService.harvestSpot(playerId, spotNumber);
			res.json(result);
		} catch (error) {
			const errorMessage = (error as Error).message;
			res.status(500).json({ error: errorMessage });
		}
	};

	// POST: Buy a new spot
	buyNewSpot = async (req: AuthenticatedRequest, res: Response) => {
		const playerId = req.player?.playerId || '';
		try {
			const result = await this.gameService.buyNewSpot(playerId);
			res.json(result);
		} catch (error) {
			const errorMessage = (error as Error).message;
			res.status(500).json({ error: errorMessage });
		}
	};

	// POST: Sell plants from inventory
	sellPlants = async (req: AuthenticatedRequest, res: Response) => {
		const playerId = req.player?.playerId || '';
		const plantId = req.body.plantId; // Access directly from req.body
		const quantityToSell = req.body.quantityToSell; // Access directly from req.body
		try {
			const result = await this.gameService.sellPlantsFromInventory(
				playerId,
				plantId,
				quantityToSell
			);
			res.json(result);
		} catch (error) {
			const errorMessage = (error as Error).message;
			res.status(500).json({ error: errorMessage });
		}
	};
}
