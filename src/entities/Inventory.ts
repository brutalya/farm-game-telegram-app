import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plant } from './Plant';
import { Player } from './Player';

@Entity()
export class Inventory {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne(() => Player, (player) => player.inventory)
	player!: Player;

	@ManyToOne(() => Plant)
	plant!: Plant;

	@Column({ type: 'int', default: 0 })
	amount!: number; // Amount of harvested plants
}
