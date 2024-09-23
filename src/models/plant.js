"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plant = void 0;
// src/models/Plant.ts
class Plant {
    constructor(id, name, tier, cost, sellPrice, growTime) {
        this.id = id;
        this.name = name;
        this.tier = tier;
        this.cost = cost;
        this.sellPrice = sellPrice;
        this.growTime = growTime;
    }
}
exports.Plant = Plant;
