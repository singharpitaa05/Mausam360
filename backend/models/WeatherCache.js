// WEATHERCACHE MODEL

// backend/models/WeatherCache.js
import mongoose from 'mongoose';

/**
 * Schema for caching weather data to reduce API calls
 * Stores weather data with TTL for automatic expiration
 */
const weatherCacheSchema = new mongoose.Schema({
  // Unique identifier (city name or coordinates)
  locationKey: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  // City name for easy reference
  cityName: {
    type: String,
    required: true
  },
  
  // Coordinates
  coordinates: {
    lat: Number,
    lon: Number
  },
  
  // Current weather data
  currentWeather: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  
  // Hourly forecast data (24-48 hours)
  hourlyForecast: {
    type: mongoose.Schema.Types.Mixed
  },
  
  // Weekly forecast data (7 days)
  weeklyForecast: {
    type: mongoose.Schema.Types.Mixed
  },
  
  // Timestamp for cache expiration
  cachedAt: {
    type: Date,
    default: Date.now,
    expires: 600 // Auto-delete after 10 minutes (600 seconds)
  }
}, {
  timestamps: true
});

// Index for faster queries
weatherCacheSchema.index({ cachedAt: 1 });

const WeatherCache = mongoose.model('WeatherCache', weatherCacheSchema);

export default WeatherCache;