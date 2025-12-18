import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import path from 'path';

dotenv.config({ path: '../.env' }); // looks for .env in backend folder

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://mern-vite-app.onrender.com'
    : 'http://localhost:5173',
  credentials: true,
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Serve React frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
