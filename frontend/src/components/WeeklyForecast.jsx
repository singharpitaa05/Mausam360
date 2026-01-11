// WEEKLY FORECAST COMPONENT

// frontend/src/components/WeeklyForecast.jsx
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatTemperature, getDayName, getWeatherIconUrl } from '../utils/weatherHelpers.js';

const WeeklyForecast = ({ weeklyData, unit = 'celsius' }) => {
  if (!weeklyData || weeklyData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No weekly forecast data available
      </div>
    );
  }

  // Prepare chart data
  const chartData = weeklyData.map((day) => {
    const dayName = getDayName(day.timestamp);
    return {
      day: dayName.slice(0, 3), // Short day name
      min: unit === 'celsius' ? day.tempMin : Math.round((day.tempMin * 9/5) + 32),
      max: unit === 'celsius' ? day.tempMax : Math.round((day.tempMax * 9/5) + 32),
    };
  });

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-2 border-blue-200 rounded-xl p-4 shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{payload[0].payload.day}</p>
          <p className="text-red-600">
            Max: {formatTemperature(payload[1].value, unit)}
          </p>
          <p className="text-blue-600">
            Min: {formatTemperature(payload[0].value, unit)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-white mb-6">7-Day Forecast</h3>
      
      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              label={{ value: unit === 'celsius' ? '°C' : '°F', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="min" fill="#3b82f6" name="Min Temp" radius={[8, 8, 0, 0]} />
            <Bar dataKey="max" fill="#ef4444" name="Max Temp" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Separator between chart and cards */}
      <div className="my-12 flex justify-center">
        <div className="w-80 h-px bg-white/200 rounded" />
      </div>

      {/* Weekly Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {weeklyData.map((day, index) => {
          const isToday = index === 0;
          return (
            <div 
              key={index}
              className={`bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow ${
                isToday ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-lg font-bold text-gray-800">
                  {isToday ? 'Today' : getDayName(day.timestamp)}
                </p>
                {isToday && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Current
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <img 
                  src={getWeatherIconUrl(day.icon)} 
                  alt={day.description}
                  className="w-16 h-16"
                />
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-800">
                    {formatTemperature(day.tempMax, unit)}
                  </p>
                  <p className="text-lg text-gray-500">
                    {formatTemperature(day.tempMin, unit)}
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 capitalize mb-3">
                {day.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-2">
                <div className="flex items-center gap-1">
                  <span>💧</span>
                  <span>{day.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>💨</span>
                  <span>{day.windSpeed} m/s</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🌧️</span>
                  <span>{day.pop}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📊</span>
                  <span>ΔT: {day.tempMax - day.tempMin}°</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForecast;