import {
	Column,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Field } from './Field';
import { Inventory } from './Inventory';

@Entity()
export class Player {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ unique: true })
	name!: string;

	@Column()
	money!: number;

	@OneToOne(() => Field, (field) => field.player, { cascade: true })
	field!: Field;

	@OneToMany(() => Inventory, (inventory) => inventory.player)
	inventory!: Inventory[];
}
