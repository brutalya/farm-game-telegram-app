// src/models/gameState.ts
import { Facility } from '../models/facility';
import { Player } from '../models/player';
import { Process } from '../models/process';
import { Resource } from '../models/resource';

export interface GameState {
	players: { [playerId: string]: Player };
	resources: { [resourceId: string]: Resource };
	facilities: { [facilityId: string]: Facility };
	processes: { [processId: string]: Process };
}
