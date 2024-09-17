// src/models/facility.ts
export interface Facility {
	id: string;
	type: string;
	name: string;
	capacity: number;
	processes: string[]; // Array of process IDs
	upgrades: string[]; // Array of upgrade IDs
}
