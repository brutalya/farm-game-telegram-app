// src/controllers/GameController.ts
import { Request, Response } from 'express';
import { GameService } from '../services/gameService';

export class GameController {
	private gameService: GameService;

	constructor() {
		this.gameService = new GameService();
	}

	createPlayer = (req: Request, res: Response) => {
		const { playerId } = req.body;
		const player = this.gameService.createPlayer(playerId);
		res.json(player);
	};

	plantCrop = (req: Request, res: Response) => {
		const { playerId, plantId } = req.body;
		const success = this.gameService.plantCrop(playerId, plantId);
		res.json({ success });
	};

	harvestCrop = (req: Request, res: Response) => {
		const { playerId, spotIndex } = req.body;
		const success = this.gameService.harvestCrop(playerId, spotIndex);
		res.json({ success });
	};

	sellCrop = (req: Request, res: Response) => {
		const { playerId, plantId, amount } = req.body;
		const success = this.gameService.sellCrop(playerId, plantId, amount);
		res.json({ success });
	};

	getFieldInfo = (req: Request, res: Response) => {
		const { playerId } = req.params;
		const fieldInfo = this.gameService.getFieldInfo(playerId);
		res.json(fieldInfo);
	};

	getPlayerInfo = (req: Request, res: Response) => {
		const { playerId } = req.params;
		const playerInfo = this.gameService.getPlayerInfo(playerId);
		res.json(playerInfo);
	};
}
