import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field } from './Field';
import { Plant } from './Plant';

@Entity()
export class Spot {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne(() => Field, (field) => field.spots)
	field!: Field;

	@ManyToOne(() => Plant, (plant) => plant.spots)
	plant!: Plant | null;

	@Column({ type: 'int' })
	spotNumber!: number; // Index of the spot in the field

	@Column({ type: 'boolean', default: false })
	isOccupied!: boolean; // Whether the spot currently has a plant

	@Column({ type: 'boolean', default: false })
	isActive!: boolean; // Whether the player can plant on this spot

	@Column({ type: 'int', default: 100 }) // Cost to unlock this spot
	cost!: number;

	@Column({ type: 'timestamp', nullable: true })
	timePlanted!: Date | null;
}
