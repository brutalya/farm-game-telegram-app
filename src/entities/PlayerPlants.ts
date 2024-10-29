import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plant } from './Plant';
import { Player } from './Player';

@Entity()
export class PlayerPlants {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne(() => Player, (player) => player.id)
	player!: Player;

	@ManyToOne(() => Plant, (plant) => plant.id)
	plant!: Plant;
}
