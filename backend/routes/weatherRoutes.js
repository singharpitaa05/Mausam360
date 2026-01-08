// WEATHER ROUTES

// backend/routes/weatherRoutes.js
import express from 'express';
import * as weatherController from '../controllers/weatherController.js';

const router = express.Router();

/**
 * Weather Routes
 * Base path: /api/weather
 */

// Get complete weather data by coordinates (from geolocation)
// GET /api/weather/coordinates?lat=28.6139&lon=77.2090
router.get('/coordinates', weatherController.getWeatherByCoordinates);

// Get complete weather data by city name
// GET /api/weather/city?city=London
router.get('/city', weatherController.getWeatherByCity);

// Validate if a city exists (lightweight check)
// GET /api/weather/validate-city?city=Paris
router.get('/validate-city', weatherController.validateCity);

// Get only current weather (no forecast)
// GET /api/weather/current?lat=28.6139&lon=77.2090
// GET /api/weather/current?city=Mumbai
router.get('/current', weatherController.getCurrentWeatherOnly);

export default router;