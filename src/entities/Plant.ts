// src/entities/Plant.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plant {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ unique: true })
	name!: string;

	@Column()
	tier!: number;

	@Column()
	cost!: number;

	@Column()
	sellPrice!: number;

	@Column()
	growTime!: number;
}
