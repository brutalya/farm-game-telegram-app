// src/models/Plant.ts
export class Plant {
	constructor(
		public id: string,
		public name: string,
		public tier: number,
		public cost: number,
		public sellPrice: number,
		public growTime: number
	) {}
}
