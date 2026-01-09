// FOOTER COMPONENT

// frontend/src/components/Footer.jsx
import { Globe, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Mausam360</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your complete weather companion providing real-time weather data, 
              hourly forecasts, and 7-day predictions for cities worldwide.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                Real-time weather updates
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                Hourly & weekly forecasts
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                Recent searches history
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                Personalized preferences
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Built With</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                React + Vite
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                Tailwind CSS v4
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                Node.js + Express
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                MongoDB
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Mausam360 Team
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>© {currentYear} Mausam360</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>All rights reserved</span>
          </div>
        </div>

        {/* Data source attribution */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            Weather data powered by OpenWeather API
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;