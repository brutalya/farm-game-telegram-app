// src/controllers/GameController.ts
import { Request, Response } from 'express';
import { GameService } from '../services/gameService';

export class GameController {
	private gameService: GameService;

	constructor() {
		this.gameService = new GameService();
	}

	createPlayer = async (req: Request, res: Response) => {
		const { playerId } = req.body;
		try {
			const player = await this.gameService.createPlayer(playerId);
			res.json(player);
		} catch (error) {
			res.status(500).json({ error: 'Error creating player' });
		}
	};

	createPlant = async (req: Request, res: Response) => {
		const { name, tier, cost, sellPrice, growTime } = req.body;
		try {
			const player = await this.gameService.createPlant(
				name,
				tier,
				cost,
				sellPrice,
				growTime
			);
			res.json(player);
		} catch (error) {
			res.status(500).json({ error: 'Error creating plant' });
		}
	};

	plantCrop = async (req: Request, res: Response) => {
		const { playerId, plantId } = req.body;
		try {
			const success = await this.gameService.plantCrop(playerId, plantId);
			res.json({ success });
		} catch (error) {
			res.status(500).json({ error: 'Error planting crop' + error });
		}
	};

	harvestCrop = async (req: Request, res: Response) => {
		const { playerId, spotIndex } = req.body;
		try {
			const success = await this.gameService.harvestCrop(playerId, spotIndex);
			res.json({ success });
		} catch (error) {
			res.status(500).json({ error: 'Error harvesting crop' });
		}
	};

	harvestByPlantName = async (req: Request, res: Response) => {
		const { playerId, plantName } = req.body;
		try {
			const success = await this.gameService.harvestByPlantName(
				playerId,
				plantName
			);
			res.json({ success });
		} catch (error) {
			res.status(500).json({ error: 'Error harvesting crop' });
		}
	};

	sellCrop = async (req: Request, res: Response) => {
		const { playerId, plantId, amount } = req.body;
		try {
			const success = await this.gameService.sellCrop(
				playerId,
				plantId,
				amount
			);
			res.json({ success });
		} catch (error) {
			res.status(500).json({ error: 'Error selling crop' });
		}
	};

	getFieldInfo = async (req: Request, res: Response) => {
		const { playerId } = req.params;
		try {
			const fieldInfo = await this.gameService.getFieldInfo(playerId);
			res.json(fieldInfo);
		} catch (error) {
			res.status(500).json({ error: 'Error getting field info' });
		}
	};

	getPlayerInfo = async (req: Request, res: Response) => {
		const { playerId } = req.params;
		try {
			const playerInfo = await this.gameService.getPlayerInfo(playerId);
			res.json(playerInfo);
		} catch (error) {
			res.status(500).json({ error: 'Error getting player info' });
		}
	};
}
