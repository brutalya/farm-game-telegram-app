"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientResourcesError = exports.PlayerNotFoundError = void 0;
// src/utils/errors.ts
class PlayerNotFoundError extends Error {
    constructor(playerId) {
        super(`Player not found: ${playerId}`);
        this.name = 'PlayerNotFoundError';
    }
}
exports.PlayerNotFoundError = PlayerNotFoundError;
class InsufficientResourcesError extends Error {
    constructor(resourceId) {
        super(`Insufficient resources: ${resourceId}`);
        this.name = 'InsufficientResourcesError';
    }
}
exports.InsufficientResourcesError = InsufficientResourcesError;
