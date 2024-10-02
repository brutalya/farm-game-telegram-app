import express from 'express';
import router from './routes';

const app = express();

// Enable JSON parsing middleware
app.use(express.json());

// Use routes
app.use('/api', router);

export default app;
