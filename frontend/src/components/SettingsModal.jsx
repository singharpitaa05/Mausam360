// SETTING MODAL COMPONENT

// frontend/src/components/SettingsModal.jsx
import { MapPin, Save, Settings, Thermometer, X } from 'lucide-react';
import { useState } from 'react';

const SettingsModal = ({ isOpen, onClose, preferences, onSave }) => {
  const [defaultCity, setDefaultCity] = useState(preferences?.defaultCity?.name || 'New Delhi');
  const [tempUnit, setTempUnit] = useState(preferences?.temperatureUnit || 'celsius');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      defaultCity: defaultCity,
      temperatureUnit: tempUnit
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-5 rounded-xl">
              <Settings className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            <X className="w-10 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Default City */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
              <MapPin className="w-4 h-4 text-blue-500" />
              Default City
            </label>
            <input
              type="text"
              value={defaultCity}
              onChange={(e) => setDefaultCity(e.target.value)}
              placeholder="Enter city name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">
              This city will be shown when you open the app
            </p>
          </div>

          {/* Temperature Unit */}
          <div>
            <label className="flex items-center gap-2 text-m font-semibold text-gray-700 mb-3">
              <Thermometer className="w-10 h-6 text-blue-500" />
              Temperature Unit
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setTempUnit('celsius')}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                  tempUnit === 'celsius'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Celsius (°C)
              </button>
              <button
                onClick={() => setTempUnit('fahrenheit')}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                  tempUnit === 'fahrenheit'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Fahrenheit (°F)
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;