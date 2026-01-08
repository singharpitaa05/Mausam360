// WEATHER CONTROLLER

// backend/controllers/weatherController.js
import * as weatherService from '../services/weatherService.js';

/**
 * Get weather by coordinates (from geolocation)
 * Route: GET /api/weather/coordinates
 */
export const getWeatherByCoordinates = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    // Validate coordinates
    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }
    
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid coordinates'
      });
    }
    
    // Fetch weather data
    const weatherData = await weatherService.getCompleteWeatherData(latitude, longitude);
    
    res.status(200).json({
      success: true,
      data: weatherData,
      message: weatherData.cached ? 'Data from cache' : 'Fresh data fetched'
    });
    
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch weather data'
    });
  }
};

/**
 * Get weather by city name
 * Route: GET /api/weather/city
 */
export const getWeatherByCity = async (req, res) => {
  try {
    const { city } = req.query;
    
    // Validate city name
    if (!city || city.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'City name is required'
      });
    }
    
    // First get current weather to get coordinates
    const currentWeather = await weatherService.getCurrentWeatherByCity(city);
    
    // Then fetch complete data using coordinates
    const weatherData = await weatherService.getCompleteWeatherData(
      currentWeather.coordinates.lat,
      currentWeather.coordinates.lon,
      city
    );
    
    res.status(200).json({
      success: true,
      data: weatherData,
      message: weatherData.cached ? 'Data from cache' : 'Fresh data fetched'
    });
    
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    
    if (error.message === 'City not found') {
      return res.status(404).json({
        success: false,
        message: 'City not found. Please check the spelling and try again.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch weather data'
    });
  }
};

/**
 * Validate if a city exists (used before searching)
 * Route: GET /api/weather/validate-city
 */
export const validateCity = async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city || city.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'City name is required'
      });
    }
    
    // Try to fetch weather for the city
    const weatherData = await weatherService.getCurrentWeatherByCity(city);
    
    res.status(200).json({
      success: true,
      valid: true,
      city: weatherData.city,
      country: weatherData.country,
      coordinates: weatherData.coordinates
    });
    
  } catch (error) {
    if (error.message === 'City not found') {
      return res.status(200).json({
        success: true,
        valid: false,
        message: 'City not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to validate city'
    });
  }
};

/**
 * Get current weather only (lightweight endpoint)
 * Route: GET /api/weather/current
 */
export const getCurrentWeatherOnly = async (req, res) => {
  try {
    const { lat, lon, city } = req.query;
    
    let currentWeather;
    
    if (city) {
      currentWeather = await weatherService.getCurrentWeatherByCity(city);
    } else if (lat && lon) {
      currentWeather = await weatherService.getCurrentWeatherByCoords(
        parseFloat(lat),
        parseFloat(lon)
      );
    } else {
      return res.status(400).json({
        success: false,
        message: 'Either city name or coordinates are required'
      });
    }
    
    res.status(200).json({
      success: true,
      data: currentWeather
    });
    
  } catch (error) {
    console.error('Error fetching current weather:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch current weather'
    });
  }
};