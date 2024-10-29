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

	@Column({ unique: true }) // Unique identifier for each Telegram user
	telegramId!: string;

	@Column({ type: 'int', default: 1000 }) // Starting money
	money!: number;

	@OneToMany(() => Inventory, (inventory) => inventory.player)
	inventory!: Inventory[];

	@OneToOne(() => Field, (field) => field.player) // One-to-one relationship with Field
	field!: Field;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt!: Date;
}
