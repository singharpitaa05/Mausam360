// frontend/src/App.jsx
import { useCallback, useEffect, useState } from 'react';
import AutoRefresh from './components/AutoRefresh.jsx';
import EmptyState from './components/EmptyState.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import Footer from './components/Footer.jsx';
import ForecastTabs from './components/ForecastTabs.jsx';
import Header from './components/Header.jsx';
import HourlyForecast from './components/HourlyForecast.jsx';
import LoadingSkeleton from './components/LoadingSkeleton.jsx';
import NetworkStatus from './components/NetworkStatus.jsx';
import RecentSearches from './components/RecentSearches.jsx';
import SearchBar from './components/SearchBar.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import WeeklyForecast from './components/WeeklyForecast.jsx';
import { useGeolocation } from './hooks/useGeolocation.js';
import { useUserPreferences } from './hooks/useUserPreferences.js';
import { getWeatherByCity, getWeatherByCoordinates } from './services/weatherApi.js';
import { logError, parseError } from './utils/errorHandler.js';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('celsius');
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('current');
  const [showSettings, setShowSettings] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  // Get user location and preferences
  const { location, loading: locationLoading } = useGeolocation();
  const { 
    preferences, 
    loading: preferencesLoading,
    addToRecentSearches,
    clearRecent,
    updatePreferences,
    setTemperatureUnit
  } = useUserPreferences();

  // Set unit from preferences
  useEffect(() => {
    if (preferences?.temperatureUnit) {
      setUnit(preferences.temperatureUnit);
    }
  }, [preferences]);

  // Fetch weather data
  const fetchWeatherData = useCallback(async (lat, lon, cityName = null) => {
    try {
      const response = await getWeatherByCoordinates(lat, lon);
      setWeatherData(response.data);
      setLastFetchTime(Date.now());
      setError(null);
      return response.data;
    } catch (err) {
      const parsedError = parseError(err);
      logError(err, 'Fetch Weather Data');
      throw new Error(parsedError.message);
    }
  }, []);

  // Fetch initial weather on mount
  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // Wait for both location and preferences to load
        if (locationLoading || preferencesLoading) return;

        if (location) {
          // Use detected location
          console.log('📍 Fetching weather for detected location');
          await fetchWeatherData(location.lat, location.lon);
        } else if (preferences?.defaultCity) {
          // Use default city from preferences
          console.log('📍 Using default city from preferences:', preferences.defaultCity.name);
          await fetchWeatherData(
            preferences.defaultCity.coordinates.lat,
            preferences.defaultCity.coordinates.lon
          );
        } else {
          // Final fallback
          console.log('📍 Using fallback city: New Delhi');
          const response = await getWeatherByCity('New Delhi');
          setWeatherData(response.data);
          setLastFetchTime(Date.now());
        }

        setLoading(false);
      } catch (err) {
        logError(err, 'Initial Weather Fetch');
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInitialWeather();
  }, [location, locationLoading, preferences, preferencesLoading, fetchWeatherData]);

  // Handle city search
  const handleCitySearch = async (cityName) => {
    try {
      setSearchLoading(true);
      setError(null);

      console.log('🔍 Searching for city:', cityName);
      const response = await getWeatherByCity(cityName);
      const data = response.data;
      
      setWeatherData(data);
      setLastFetchTime(Date.now());
      
      // Add to recent searches
      if (data.current) {
        await addToRecentSearches(
          data.current.city,
          data.current.coordinates
        );
      }
      
      setSearchLoading(false);
    } catch (err) {
      logError(err, 'City Search');
      const parsedError = parseError(err);
      setError(parsedError.message);
      setSearchLoading(false);
    }
  };

  // Handle recent search selection
  const handleSelectRecentCity = async (cityName, coordinates) => {
    try {
      setSearchLoading(true);
      setError(null);

      console.log('📍 Loading recent city:', cityName);
      await fetchWeatherData(coordinates.lat, coordinates.lon);
      setSearchLoading(false);
    } catch (err) {
      logError(err, 'Recent City Selection');
      setError(err.message);
      setSearchLoading(false);
    }
  };

  // Handle clear recent searches
  const handleClearRecent = async () => {
    try {
      await clearRecent();
      console.log('🗑️ Recent searches cleared');
    } catch (err) {
      logError(err, 'Clear Recent Searches');
    }
  };

  // Handle retry
  const handleRetry = async () => {
    setError(null);
    setLoading(true);
    
    try {
      if (weatherData?.current?.coordinates) {
        await fetchWeatherData(
          weatherData.current.coordinates.lat,
          weatherData.current.coordinates.lon
        );
      } else {
        window.location.reload();
      }
      setLoading(false);
    } catch (err) {
      logError(err, 'Retry');
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle auto refresh
  const handleAutoRefresh = async () => {
    if (!weatherData?.current?.coordinates) return;
    
    try {
      console.log('🔄 Auto-refreshing weather data');
      await fetchWeatherData(
        weatherData.current.coordinates.lat,
        weatherData.current.coordinates.lon
      );
    } catch (err) {
      logError(err, 'Auto Refresh');
      // Silent fail for auto-refresh
    }
  };

  // Handle unit change
  const handleUnitChange = async (newUnit) => {
    setUnit(newUnit);
    // Save to preferences
    try {
      await setTemperatureUnit(newUnit);
    } catch (err) {
      logError(err, 'Unit Change');
    }
  };

  // Handle tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Handle settings save
  const handleSaveSettings = async (settings) => {
    try {
      // Update default city if changed
      if (settings.defaultCity !== preferences?.defaultCity?.name) {
        const response = await getWeatherByCity(settings.defaultCity);
        if (response.data?.current) {
          await updatePreferences({
            defaultCity: {
              name: response.data.current.city,
              coordinates: response.data.current.coordinates
            }
          });
        }
      }

      // Update temperature unit
      if (settings.temperatureUnit !== preferences?.temperatureUnit) {
        await setTemperatureUnit(settings.temperatureUnit);
        setUnit(settings.temperatureUnit);
      }

      console.log('✅ Settings saved successfully');
    } catch (err) {
      logError(err, 'Save Settings');
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    if (!weatherData) return <EmptyState type="no-data" />;

    switch (activeTab) {
      case 'current':
        return <WeatherCard weatherData={weatherData} unit={unit} />;
      case 'hourly':
        return <HourlyForecast hourlyData={weatherData.hourly} unit={unit} />;
      case 'weekly':
        return <WeeklyForecast weeklyData={weatherData.weekly} unit={unit} />;
      default:
        return <WeatherCard weatherData={weatherData} unit={unit} />;
    }
  };

  return (
    <div className="dark-container flex flex-col h-screen">
      {/* Network Status Indicator */}
      <NetworkStatus />
      
      {/* Header */}
      <Header 
        unit={unit} 
        onUnitChange={handleUnitChange}
        onOpenSettings={() => setShowSettings(true)}
      />
      
      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="sidebar hidden lg:block">
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-tertiary mb-4">Menu</h2>
            <nav className="sidebar-nav">
              <button
                onClick={() => handleTabChange('current')}
                className={`sidebar-nav-item ${activeTab === 'current' ? 'active' : ''}`}
              >
                <span className="flex items-center gap-3">
                  <span>📍</span>
                  <span>Current Weather</span>
                </span>
              </button>
              <button
                onClick={() => handleTabChange('hourly')}
                className={`sidebar-nav-item ${activeTab === 'hourly' ? 'active' : ''}`}
              >
                <span className="flex items-center gap-3">
                  <span>⏰</span>
                  <span>Hourly Forecast</span>
                </span>
              </button>
              <button
                onClick={() => handleTabChange('weekly')}
                className={`sidebar-nav-item ${activeTab === 'weekly' ? 'active' : ''}`}
              >
                <span className="flex items-center gap-3">
                  <span>📅</span>
                  <span>Weekly Forecast</span>
                </span>
              </button>
            </nav>
          </div>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(true)}
            className="sidebar-nav-item w-full text-left flex items-center gap-3"
          >
            <span>⚙️</span>
            <span>Settings</span>
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="main-content flex-1 overflow-y-auto">
          {/* Search Bar Section */}
          <div className="content-section">
            <SearchBar onSearch={handleCitySearch} loading={searchLoading} />
          </div>

          {/* Recent Searches Section */}
          {preferences?.recentSearches && preferences.recentSearches.length > 0 && (
            <div className="content-section">
              <RecentSearches
                recentSearches={preferences.recentSearches}
                onSelectCity={handleSelectRecentCity}
                onClear={handleClearRecent}
              />
            </div>
          )}

          {/* Auto Refresh & Forecast Tabs */}
          {!loading && !error && weatherData && (
            <div className="content-section">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-center lg:justify-start">
                  <AutoRefresh onRefresh={handleAutoRefresh} interval={600000} />
                </div>
                <ForecastTabs activeTab={activeTab} onTabChange={handleTabChange} />
              </div>
            </div>
          )}

          {/* Main Content Widget */}
          <div className="content-section">
            <div className="weather-widget">
              {loading ? (
                <LoadingSkeleton />
              ) : error ? (
                <ErrorMessage message={error} onRetry={handleRetry} />
              ) : (
                renderContent()
              )}
            </div>
          </div>

          {/* Footer Info */}
          {!loading && weatherData && (
            <div className="content-section">
              <div className="text-center text-text-secondary">
                <p className="text-sm">
                  {weatherData.cached ? '📦 Data from cache' : '🌐 Fresh data'}
                </p>
                {lastFetchTime && (
                  <p className="text-xs mt-2 opacity-70">
                    Last updated: {new Date(lastFetchTime).toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        preferences={preferences}
        onSave={handleSaveSettings}
      />
      <Footer />
    </div>
  );
}

export default App;