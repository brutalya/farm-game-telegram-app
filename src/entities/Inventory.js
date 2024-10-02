"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
// src/entities/Inventory.ts
const typeorm_1 = require("typeorm");
const Plant_1 = require("./Plant");
const Player_1 = require("./Player");
let Inventory = class Inventory {
    constructor() {
        this.amount = 0;
    }
};
exports.Inventory = Inventory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inventory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Player_1.Player, (player) => player.inventory),
    __metadata("design:type", Player_1.Player)
], Inventory.prototype, "player", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Plant_1.Plant),
    __metadata("design:type", Plant_1.Plant)
], Inventory.prototype, "plant", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Inventory.prototype, "amount", void 0);
exports.Inventory = Inventory = __decorate([
    (0, typeorm_1.Entity)()
], Inventory);
