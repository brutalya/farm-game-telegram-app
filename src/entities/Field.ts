import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from './Player';
import { Spot } from './Spot';

@Entity()
export class Field {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	tier!: number;

	@Column()
	size!: number;

	@OneToOne(() => Player, (player) => player.field)
	@JoinColumn()
	player!: Player;

	@OneToMany(() => Spot, (spot) => spot.field, { cascade: true })
	spots!: Spot[];
}
