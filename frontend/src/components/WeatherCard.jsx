// WEATHER CARD COMPONENT

// frontend/src/components/WeatherCard.jsx
import { Cloud, Droplets, Eye, Gauge, Sunrise, Sunset, Wind } from 'lucide-react';
import {
  formatTemperature,
  formatTime,
  formatVisibility,
  getWeatherIconUrl
} from '../utils/weatherHelpers.js';

const WeatherCard = ({ weatherData, unit = 'celsius' }) => {
  if (!weatherData) return null;

  const { current } = weatherData;

  return (
    <div className="w-full">
      {/* Main Weather Display */}
      <div className="bg-linear-gradient-to-br from-gray-800 to-gray-900 p-8 mb-6 rounded-lg">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: Temperature & Location */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {current.city}, {current.country}
            </h2>
            <div className="flex items-center justify-center lg:justify-start gap-6">
              <img 
                src={getWeatherIconUrl(current.icon)} 
                alt={current.description}
                className="w-28 h-28"
              />
              <div>
                <div className="text-7xl font-bold text-white mb-2">
                  {formatTemperature(current.temperature, unit)}
                </div>
                <div className="text-xl capitalize text-gray-300 mt-2">
                  {current.description}
                </div>
                <div className="text-gray-400 mt-4">
                  Feels like {formatTemperature(current.feelsLike, unit)}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sun Times */}
          <div className="flex flex-col gap-4">
            <div className="bg-linear-gradient-to-br from-gray-700 to-gray-800 px-6 py-4 flex items-center gap-4 rounded-lg">
              <div className="bg-linear-gradient-to-br from-yellow-400 to-yellow-600 p-3 rounded-lg text-white">
                <Sunrise className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Sunrise</div>
                <div className="text-lg font-semibold text-white">
                  {formatTime(current.sunrise, current.timezone)}
                </div>
              </div>
            </div>
            <div className="bg-linear-gradient-to-br from-gray-700 to-gray-800 px-6 py-4 flex items-center gap-4 rounded-lg">
              <div className="bg-linear-gradient-to-br from-yellow-500 to-orange-600 p-3 rounded-lg text-white">
                <Sunset className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Sunset</div>
                <div className="text-lg font-semibold text-white">
                  {formatTime(current.sunset, current.timezone)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Humidity */}
        <div className="bg-linear-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-linear-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-lg text-white">
              <Droplets className="w-6 h-6" />
            </div>
            <span className="text-gray-300 font-medium">Humidity</span>
          </div>
          <div className="text-3xl font-bold text-white">{current.humidity}%</div>
        </div>

        {/* Wind Speed */}
        <div className="bg-linear-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-linear-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-lg text-white">
              <Wind className="w-6 h-6" />
            </div>
            <span className="text-gray-300 font-medium">Wind Speed</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {current.windSpeed} m/s
          </div>
        </div>

        {/* Pressure */}
        <div className="bg-linear-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-linear-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-lg text-white">
              <Gauge className="w-6 h-6" />
            </div>
            <span className="text-gray-300 font-medium">Pressure</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {current.pressure} hPa
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-linear-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-linear-gradient-to-br from-yellow-400 to-yellow-600 p-3 rounded-lg text-white">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-gray-300 font-medium">Visibility</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {formatVisibility(current.visibility)}
          </div>
        </div>

        {/* Cloud Coverage */}
        <div className="bg-linear-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-linear-gradient-to-br from-gray-500 to-gray-700 p-3 rounded-lg text-white">
              <Cloud className="w-6 h-6" />
            </div>
            <span className="text-gray-300 font-medium">Clouds</span>
          </div>
          <div className="text-3xl font-bold text-white">{current.clouds}%</div>
        </div>

        {/* Feels Like */}
        <div className="bg-linear-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-linear-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-lg text-white">
              <span className="text-2xl">🌡️</span>
            </div>
            <span className="text-gray-300 font-medium">Feels Like</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {formatTemperature(current.feelsLike, unit)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;