// ERROR HANDLER MIDDLEWARE

// backend/middleware/errorHandler.js
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
/**
 * Centralized error handling middleware
 * Catches all errors and sends appropriate responses
 */
export const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('❌ Error:', err.message);
  console.error('Stack:', err.stack);
  
  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }
  
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data format';
  }
  
  if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate entry found';
  }
  
  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Handle 404 - Not Found
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};