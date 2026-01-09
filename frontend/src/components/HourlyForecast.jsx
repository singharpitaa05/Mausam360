// HOURLY FORECAST COMPONENT

// frontend/src/components/HourlyForecast.jsx
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatTemperature, formatTime, getWeatherIconUrl } from '../utils/weatherHelpers.js';

const HourlyForecast = ({ hourlyData, unit = 'celsius' }) => {
  if (!hourlyData || hourlyData.length === 0) {
    return (
      <div className="text-center py-8 text-text-tertiary">
        No hourly forecast data available
      </div>
    );
  }

  // Prepare chart data
  const chartData = hourlyData.map((item) => ({
    time: formatTime(item.timestamp),
    temp: unit === 'celsius' ? item.temperature : Math.round((item.temperature * 9/5) + 32),
    feelsLike: unit === 'celsius' ? item.feelsLike : Math.round((item.feelsLike * 9/5) + 32),
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card border border-glass-border p-4 shadow-lg">
          <p className="font-semibold text-text-primary mb-2">{payload[0].payload.time}</p>
          <p className="text-accent-primary">
            Temp: {formatTemperature(payload[0].value, unit)}
          </p>
          <p className="text-accent-tertiary">
            Feels: {formatTemperature(payload[1].value, unit)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-text-primary mb-6">Hourly Forecast</h3>
      
      {/* Chart */}
      <div className="glass-card p-6 mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="time" 
              tick={{ fill: '#b0b8c1', fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fill: '#b0b8c1', fontSize: 12 }}
              label={{ value: unit === 'celsius' ? '°C' : '°F', angle: -90, position: 'insideLeft', fill: '#b0b8c1' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#00d4ff" 
              strokeWidth={3}
              dot={{ fill: '#00d4ff', r: 4 }}
              activeDot={{ r: 6 }}
              name="Temperature"
            />
            <Line 
              type="monotone" 
              dataKey="feelsLike" 
              stroke="#6366f1" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#6366f1', r: 3 }}
              name="Feels Like"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Hourly Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {hourlyData.slice(0, 12).map((hour, index) => (
          <div 
            key={index}
            className="glass-card p-4 text-center hover:border-accent-primary transition-all"
          >
            <p className="text-sm text-text-tertiary font-medium mb-2">
              {formatTime(hour.timestamp)}
            </p>
            
            <img 
              src={getWeatherIconUrl(hour.icon)} 
              alt={hour.description}
              className="w-12 h-12 mx-auto"
            />
            
            <p className="text-2xl font-bold text-gradient mb-1">
              {formatTemperature(hour.temperature, unit)}
            </p>
            
            <p className="text-xs text-text-tertiary capitalize mb-2">
              {hour.description}
            </p>
            
            <div className="flex items-center justify-center gap-2 text-xs text-text-secondary">
              <span>💧 {hour.humidity}%</span>
              <span>🌧️ {hour.pop}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;