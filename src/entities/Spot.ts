import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field } from './Field';
import { Plant } from './Plant';

@Entity()
export class Spot {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Field, (field) => field.spots)
	field!: Field;

	@ManyToOne(() => Plant)
	plant!: Plant;

	@Column({ type: 'bigint', nullable: true })
	plantingTime!: number | null;

	@Column({ type: 'bigint', nullable: true })
	harvestTime!: number | null;

	@Column()
	status!: 'planted' | 'harvested' | 'free';
}
