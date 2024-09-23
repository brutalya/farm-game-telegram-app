import { Field } from '../models/field';

// src/models/Player.ts
export class Player {
	money: number;
	inventory: Map<string, number>;
	field: Field;

	constructor(public id: string) {
		this.money = 100; // Starting money
		this.inventory = new Map();
		this.field = new Field(1, 10); // First tier field with 10 spots
	}
}
