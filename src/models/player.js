"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const field_1 = require("../models/field");
// src/models/Player.ts
class Player {
    constructor(id) {
        this.id = id;
        this.money = 100; // Starting money
        this.inventory = new Map();
        this.field = new field_1.Field(1, 10); // First tier field with 10 spots
    }
}
exports.Player = Player;
