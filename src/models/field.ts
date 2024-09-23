import { Plant } from '../models/plant';

// src/models/Field.ts
export class Field {
	spots: (Plant | null)[];
	plantingTimes: (number | null)[];

	constructor(public tier: number, public size: number) {
		this.spots = Array(size).fill(null);
		this.plantingTimes = Array(size).fill(null);
	}
}
