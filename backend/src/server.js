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
const allowedOrigins = [
  'http://localhost:5173',
  'https://auth-crud-using-context-for-render.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(
    express.static(
      path.join(__dirname, 'backend', 'frontend', 'dist')
    )
  );

  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, 'backend', 'frontend', 'dist', 'index.html')
    );
  });
}

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
