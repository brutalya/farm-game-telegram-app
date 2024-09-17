// src/models/process.ts
export interface Process {
	id: string;
	name: string;
	inputs: { resourceId: string; quantity: number }[];
	outputs: { resourceId: string; quantity: number }[];
	duration: number;
	successProbability: number;
}
