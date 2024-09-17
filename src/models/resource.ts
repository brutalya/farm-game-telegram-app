export interface Resource {
	id: string;
	type: string;
	name: string;
	properties: { [key: string]: any };
}

// src/models/facility.ts
export interface Facility {
	id: string;
	type: string;
	name: string;
	capacity: number;
	processes: string[]; // Array of process IDs
	upgrades: string[]; // Array of upgrade IDs
}

// src/models/process.ts
export interface Process {
	id: string;
	name: string;
	inputs: { resourceId: string; quantity: number }[];
	outputs: { resourceId: string; quantity: number }[];
	duration: number;
	successProbability: number;
}

// src/models/player.ts
export interface Player {
	id: string;
	resources: { [resourceId: string]: number };
	facilities: string[]; // Array of facility IDs
	currency: number;
}

// src/models/gameState.ts
export interface GameState {
	players: { [playerId: string]: Player };
	resources: { [resourceId: string]: Resource };
	facilities: { [facilityId: string]: Facility };
	processes: { [processId: string]: Process };
}
