// src/utils/errors.ts
export class PlayerNotFoundError extends Error {
	constructor(playerId: string) {
		super(`Player with ID ${playerId} not found`);
	}
}

export class ResourceNotFoundError extends Error {
	constructor(resourceId: string) {
		super(`Resource ${resourceId} not found`);
	}
}

export class InsufficientResourcesError extends Error {
	constructor(resourceId: string) {
		super(`Insufficient ${resourceId} available`);
	}
}

export class FieldNotAvailableError extends Error {
	constructor(fieldId: string) {
		super(`Field ${fieldId} is not available for planting`);
	}
}

export class ProcessNotFoundError extends Error {
	constructor(processId: string) {
		super(`Process ${processId} not found or is of incorrect type`);
	}
}
