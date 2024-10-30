// src/config/database.ts
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Field } from '../entities/Field';
import { Inventory } from '../entities/Inventory';
import { Plant } from '../entities/Plant';
import { Player } from '../entities/Player';
import { PlayerPlants } from '../entities/PlayerPlants';
import { Spot } from '../entities/Spot';

dotenv.config();

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: 5432,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [Player, Field, Plant, Inventory, Spot, PlayerPlants], //['dist/entities/**/*.js'], // Use compiled JS files
	synchronize: true,
	logging: false,
});
