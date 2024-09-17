// src/models/player.ts
export interface Player {
	id: string;
	resources: { [resourceId: string]: number };
	facilities: string[]; // Array of facility IDs
	currency: number;
}
