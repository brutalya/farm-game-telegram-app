// src/utils/errors.ts
export class PlayerNotFoundError extends Error {
	constructor(playerId: string) {
		super(`Player not found: ${playerId}`);
		this.name = 'PlayerNotFoundError';
	}
}

export class InsufficientResourcesError extends Error {
	constructor(resourceId: string) {
		super(`Insufficient resources: ${resourceId}`);
		this.name = 'InsufficientResourcesError';
	}
}
