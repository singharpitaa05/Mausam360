// frontend/src/components/Header.jsx
import { CloudSun, Settings, Thermometer } from 'lucide-react';

const Header = ({ unit, onUnitChange, onOpenSettings }) => {
  return (
    <header className="header-modern">
      <div className="header-content">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-icon">
            <CloudSun className="w-6 h-6 text-white" />
          </div>
          <div className="logo-text">
            <h1>Mausam360</h1>
            <p>Your Weather Companion</p>
          </div>
        </div>

        {/* Controls Section */}
        <div className="header-controls">
          {/* Temperature Unit Toggle */}
          <div className="flex items-center gap-3">
            <Thermometer className="w-5 h-5 text-text-secondary hidden sm:block" />
            <div className="unit-toggle">
              <button
                onClick={() => onUnitChange('celsius')}
                className={`unit-toggle-btn ${unit === 'celsius' ? 'active' : ''}`}
              >
                °C
              </button>
              <button
                onClick={() => onUnitChange('fahrenheit')}
                className={`unit-toggle-btn ${unit === 'fahrenheit' ? 'active' : ''}`}
              >
                °F
              </button>
            </div>
          </div>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="neomorph-button p-3"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-text-secondary hover:text-accent-primary transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;