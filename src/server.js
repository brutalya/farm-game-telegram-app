"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
dotenv_1.default.config();
const port = process.env.DB_USER || 3000;
console.log('Connecting to:', process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);
// Log the equivalent psql command
console.log(`psql -h ${process.env.DB_HOST} -U ${process.env.DB_USER} -d ${process.env.DB_NAME}`);
// You might also want to log the password separately (since `psql` does not include passwords in the command)
console.log(`Password: ${process.env.DB_PASSWORD}`);
// Initialize the database connection
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected successfully.');
    // Start the server after database connection
    app_1.default.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to the database:', error);
});
