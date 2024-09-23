"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = void 0;
const plant_1 = require("../models/plant");
// src/models/GameState.ts
class GameState {
    constructor() {
        this.players = new Map();
        this.plants = new Map();
        this.initializePlants();
    }
    initializePlants() {
        const carrot = new plant_1.Plant('carrot', 'Carrot', 1, 5, 10, 60); // 60 seconds grow time
        const wheat = new plant_1.Plant('wheat', 'Wheat', 1, 3, 7, 45); // 45 seconds grow time
        this.plants.set(carrot.id, carrot);
        this.plants.set(wheat.id, wheat);
    }
}
exports.GameState = GameState;
