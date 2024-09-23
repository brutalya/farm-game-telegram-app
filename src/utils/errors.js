"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessNotFoundError = exports.FieldNotAvailableError = exports.InsufficientResourcesError = exports.ResourceNotFoundError = exports.PlayerNotFoundError = void 0;
// src/utils/errors.ts
class PlayerNotFoundError extends Error {
    constructor(playerId) {
        super(`Player with ID ${playerId} not found`);
    }
}
exports.PlayerNotFoundError = PlayerNotFoundError;
class ResourceNotFoundError extends Error {
    constructor(resourceId) {
        super(`Resource ${resourceId} not found`);
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
class InsufficientResourcesError extends Error {
    constructor(resourceId) {
        super(`Insufficient ${resourceId} available`);
    }
}
exports.InsufficientResourcesError = InsufficientResourcesError;
class FieldNotAvailableError extends Error {
    constructor(fieldId) {
        super(`Field ${fieldId} is not available for planting`);
    }
}
exports.FieldNotAvailableError = FieldNotAvailableError;
class ProcessNotFoundError extends Error {
    constructor(processId) {
        super(`Process ${processId} not found or is of incorrect type`);
    }
}
exports.ProcessNotFoundError = ProcessNotFoundError;
