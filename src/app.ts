//app.ts
import cors from 'cors'; // Import cors
import express from 'express';
import router from './routes';

const app = express();

// Enable CORS for all routes
app.use(cors());

// Enable JSON parsing middleware
app.use(express.json());

// Use routes
app.use('/api', router);

export default app;
