// WEATHER SERVICE

// backend/services/weatherService.js
import axios from 'axios';
import WeatherCache from '../models/WeatherCache.js';

/**
 * Service to interact with OpenWeather API
 * Handles fetching current weather, hourly, and weekly forecasts
 */

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = process.env.OPENWEATHER_BASE_URL;

/**
 * Fetch current weather by coordinates
 */
export const getCurrentWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric' // Always fetch in metric, convert in frontend if needed
      }
    });
    
    return normalizeCurrentWeather(response.data);
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
};

/**
 * Fetch current weather by city name
 */
export const getCurrentWeatherByCity = async (cityName) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: cityName,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    return normalizeCurrentWeather(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('City not found');
    }
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
};

/**
 * Fetch hourly and daily forecast (One Call API)
 */
export const getForecastData = async (lat, lon) => {
  try {
    // Using forecast endpoint for hourly data
    const hourlyResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    return normalizeForecastData(hourlyResponse.data);
  } catch (error) {
    throw new Error(`Failed to fetch forecast data: ${error.message}`);
  }
};

/**
 * Get complete weather data with caching
 */
export const getCompleteWeatherData = async (lat, lon, cityName = null) => {
  try {
    // Create location key for caching
    const locationKey = `${lat.toFixed(2)}_${lon.toFixed(2)}`;
    
    // Check cache first
    const cachedData = await WeatherCache.findOne({ locationKey });
    
    if (cachedData) {
      console.log('✅ Returning cached weather data');
      return {
        current: cachedData.currentWeather,
        hourly: cachedData.hourlyForecast,
        weekly: cachedData.weeklyForecast,
        cached: true
      };
    }
    
    // Fetch fresh data
    console.log('🌐 Fetching fresh weather data from API');
    const [currentWeather, forecastData] = await Promise.all([
      getCurrentWeatherByCoords(lat, lon),
      getForecastData(lat, lon)
    ]);
    
    // Cache the data
    await WeatherCache.findOneAndUpdate(
      { locationKey },
      {
        locationKey,
        cityName: cityName || currentWeather.city,
        coordinates: { lat, lon },
        currentWeather,
        hourlyForecast: forecastData.hourly,
        weeklyForecast: forecastData.weekly,
        cachedAt: new Date()
      },
      { upsert: true, new: true }
    );
    
    return {
      current: currentWeather,
      hourly: forecastData.hourly,
      weekly: forecastData.weekly,
      cached: false
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Normalize current weather data
 */
const normalizeCurrentWeather = (data) => {
  return {
    city: data.name,
    country: data.sys.country,
    coordinates: {
      lat: data.coord.lat,
      lon: data.coord.lon
    },
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    visibility: data.visibility / 1000, // Convert to km
    clouds: data.clouds.all,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    timezone: data.timezone,
    timestamp: data.dt
  };
};

/**
 * Normalize forecast data (hourly and weekly)
 */
const normalizeForecastData = (data) => {
  // Hourly forecast (next 24-48 hours, 3-hour intervals)
  const hourly = data.list.slice(0, 16).map(item => ({
    timestamp: item.dt,
    temperature: Math.round(item.main.temp),
    feelsLike: Math.round(item.main.feels_like),
    condition: item.weather[0].main,
    description: item.weather[0].description,
    icon: item.weather[0].icon,
    humidity: item.main.humidity,
    windSpeed: item.wind.speed,
    pop: Math.round(item.pop * 100) // Probability of precipitation
  }));
  
  // Weekly forecast (group by day, get min/max)
  const dailyMap = new Map();
  
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        timestamp: item.dt,
        temps: [],
        conditions: [],
        humidity: [],
        windSpeed: [],
        pop: []
      });
    }
    
    const dayData = dailyMap.get(date);
    dayData.temps.push(item.main.temp);
    dayData.conditions.push(item.weather[0]);
    dayData.humidity.push(item.main.humidity);
    dayData.windSpeed.push(item.wind.speed);
    dayData.pop.push(item.pop);
  });
  
  // Convert map to array and calculate min/max
  const weekly = Array.from(dailyMap.entries()).slice(0, 7).map(([date, data]) => {
    const temps = data.temps;
    const mostCommonCondition = getMostCommon(data.conditions, 'main');
    
    return {
      date,
      timestamp: data.timestamp,
      tempMin: Math.round(Math.min(...temps)),
      tempMax: Math.round(Math.max(...temps)),
      condition: mostCommonCondition.main,
      description: mostCommonCondition.description,
      icon: mostCommonCondition.icon,
      humidity: Math.round(average(data.humidity)),
      windSpeed: Math.round(average(data.windSpeed)),
      pop: Math.round(Math.max(...data.pop) * 100)
    };
  });
  
  return { hourly, weekly };
};

/**
 * Helper: Get most common item from array
 */
const getMostCommon = (arr, key) => {
  const counts = {};
  let maxCount = 0;
  let mostCommon = arr[0];
  
  arr.forEach(item => {
    const value = item[key];
    counts[value] = (counts[value] || 0) + 1;
    if (counts[value] > maxCount) {
      maxCount = counts[value];
      mostCommon = item;
    }
  });
  
  return mostCommon;
};

/**
 * Helper: Calculate average
 */
const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;