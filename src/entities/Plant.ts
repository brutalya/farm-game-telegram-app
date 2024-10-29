import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Spot } from './Spot';

@Entity()
export class Plant {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', length: 255 })
	name!: string;

	@Column({ type: 'int' })
	cost!: number;

	@Column({ type: 'int' }) // Time to grow in seconds
	growTime!: number;

	@Column({ type: 'int' })
	sellPrice!: number;

	@Column({ type: 'int' })
	unlockPrice!: number; // Cost to unlock the plant

	@OneToMany(() => Spot, (spot) => spot.plant)
	spots!: Spot[];
}
