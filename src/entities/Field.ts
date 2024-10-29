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
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@OneToOne(() => Player)
	@JoinColumn()
	player!: Player;

	@OneToMany(() => Spot, (spot) => spot.field)
	spots!: Spot[];

	@Column({ type: 'int', default: 25 }) // Default size for all fields
	size!: number;
}
