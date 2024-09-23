"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
// src/models/Field.ts
class Field {
    constructor(tier, size) {
        this.tier = tier;
        this.size = size;
        this.spots = Array(size).fill(null);
        this.plantingTimes = Array(size).fill(null);
    }
}
exports.Field = Field;
