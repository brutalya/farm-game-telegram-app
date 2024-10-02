// src/server.ts
import dotenv from 'dotenv';
import app from './app';
import { AppDataSource } from './config/database';

dotenv.config();

const port = 3000;

console.log(
	'Connecting to:',
	process.env.DB_HOST,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	process.env.DB_NAME
);

// Log the equivalent psql command
console.log(
	`psql -h ${process.env.DB_HOST} -U ${process.env.DB_USER} -d ${process.env.DB_NAME}`
);
// console.log(`Password: ${process.env.DB_PASSWORD}`);
console.log('PORT:', process.env.PORT); // Should print 3000 or the value in .env

// Initialize the database connection
AppDataSource.initialize()
	.then(() => {
		console.log('Database connected successfully.');

		console.log(`Server: ${port}`);
		// Start the server after database connection
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((error) => {
		console.error('Error connecting to the database:', error);
	});
