import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plant } from './Plant';
import { Player } from './Player';

@Entity()
export class Inventory {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Player, { cascade: true }) // Link to Player
	player!: Player;

	@ManyToOne(() => Plant, { cascade: true }) // Link to Plant
	plant!: Plant;

	@Column()
	amount!: number; // Number of plants in the player's inventory
}
