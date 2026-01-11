// RECENT SEARCHES COMPONENT

// frontend/src/components/RecentSearches.jsx
import { Clock, MapPin, Trash2, X } from 'lucide-react';

const RecentSearches = ({ recentSearches, onSelectCity, onClear, onClose }) => {
  if (!recentSearches || recentSearches.length === 0) {
    return null;
  }

  return (
    <div className="w-full mb-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-linear-gradient-to-br from-accent-primary to-accent-tertiary p-2 rounded-10 text-white">
              <Clock className="w-10 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">Recent Searches</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClear}
              className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="text-text-tertiary hover:text-text-secondary p-1 rounded-lg hover:bg-white/5 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {recentSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => onSelectCity(search.cityName, search.coordinates)}
              className="flex items-center gap-2 glass-card px-4 py-2 rounded-lg hover:border-accent-primary transition-all group"
            >
              <MapPin className="w-10 h-6 text-accent-primary group-hover:scale-110 transition-transform" />
              <span className="font-medium text-text-secondary group-hover:text-accent-primary transition-colors">{search.cityName}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSearches;