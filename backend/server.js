// MAIN ENTRY POINT

// backend/server.js
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import weatherRoutes from './routes/weatherRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Mausam360 API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/weather', weatherRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});