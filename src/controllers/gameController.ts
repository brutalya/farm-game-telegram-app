// src/controllers/gameController.ts
import { Request, Response } from 'express';
import gameService from '../services/gameService';
import {
	InsufficientResourcesError,
	PlayerNotFoundError,
} from '../utils/errors';

class GameController {
	public createPlayer(req: Request, res: Response): void {
		try {
			const { playerId } = req.body;
			const newPlayer = gameService.createPlayer(playerId);
			res.status(201).json(newPlayer);
		} catch (error) {
			res.status(400).json({ message: this.getErrorMessage(error) });
		}
	}

	public getPlayerState(req: Request, res: Response): void {
		try {
			const { playerId } = req.params;
			const playerState = gameService.getPlayerState(playerId);
			res.status(200).json(playerState);
		} catch (error) {
			res.status(404).json({ message: this.getErrorMessage(error) });
		}
	}

	public plantWheat(req: Request, res: Response): void {
		try {
			const { playerId } = req.body;
			const success = gameService.plantWheat(playerId);
			res.status(200).json({ message: 'Wheat planted successfully' });
		} catch (error) {
			if (error instanceof PlayerNotFoundError) {
				res.status(404).json({ message: error.message });
			} else if (error instanceof InsufficientResourcesError) {
				res.status(400).json({ message: error.message });
			} else {
				res.status(500).json({ message: 'An unexpected error occurred' });
			}
		}
	}

	private getErrorMessage(error: unknown): string {
		if (error instanceof Error) return error.message;
		return String(error);
	}
}

export default new GameController();
