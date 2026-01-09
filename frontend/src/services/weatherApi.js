// WEATHER APPLICATION SERVICE

// frontend/src/services/weatherApi.js
import api from '../config/api.js';

/**
 * Fetch weather data by coordinates (from geolocation)
 */
export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await api.get('/weather/coordinates', {
      params: { lat, lon }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};

/**
 * Fetch weather data by city name
 */
export const getWeatherByCity = async (cityName) => {
  try {
    const response = await api.get('/weather/city', {
      params: { city: cityName }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};

/**
 * Validate if a city exists
 */
export const validateCity = async (cityName) => {
  try {
    const response = await api.get('/weather/validate-city', {
      params: { city: cityName }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to validate city');
  }
};

/**
 * Get only current weather (lightweight)
 */
export const getCurrentWeather = async (params) => {
  try {
    const response = await api.get('/weather/current', { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch current weather');
  }
};