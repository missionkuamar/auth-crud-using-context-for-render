import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // FIXED: Changed 'core' to 'cors'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js'; // FIXED: Complete path

dotenv.config({
  path: '../.env',
});

connectDB();

const app = express();
// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});
// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite runs on 5173
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});