// WEATHER HELPERS UTILITY

// frontend/src/utils/weatherHelpers.js

/**
 * Convert Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius) => {
  return Math.round((celsius * 9/5) + 32);
};

/**
 * Format temperature based on unit preference
 */
export const formatTemperature = (temp, unit = 'celsius') => {
  if (unit === 'fahrenheit') {
    return `${celsiusToFahrenheit(temp)}°F`;
  }
  return `${temp}°C`;
};

/**
 * Get weather icon URL from OpenWeather
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

/**
 * Format timestamp to readable time
 */
export const formatTime = (timestamp, timezone = 0) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Format timestamp to date
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get day name from timestamp
 */
export const getDayName = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

/**
 * Get weather condition emoji
 */
export const getWeatherEmoji = (condition) => {
  const emojiMap = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️'
  };
  return emojiMap[condition] || '🌤️';
};

/**
 * Get wind direction from degrees
 */
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

/**
 * Format visibility in km
 */
export const formatVisibility = (visibility) => {
  return `${visibility.toFixed(1)} km`;
};

/**
 * Get air quality description (placeholder for future)
 */
export const getAirQualityLevel = (aqi) => {
  if (aqi <= 50) return { level: 'Good', color: 'text-green-600' };
  if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-600' };
  if (aqi <= 150) return { level: 'Unhealthy', color: 'text-orange-600' };
  return { level: 'Hazardous', color: 'text-red-600' };
};