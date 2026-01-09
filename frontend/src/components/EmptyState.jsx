// EMPTY STATE COMPONENT

// frontend/src/components/EmptyState.jsx
import { CloudOff, Search } from 'lucide-react';

const EmptyState = ({ type = 'no-data', onAction }) => {
  const states = {
    'no-data': {
      icon: CloudOff,
      title: 'No Weather Data',
      description: 'Start by searching for a city to see weather information',
      actionText: 'Search City',
      iconColor: 'text-gray-400'
    },
    'no-results': {
      icon: Search,
      title: 'No Results Found',
      description: 'We couldn\'t find any weather data for your search',
      actionText: 'Try Another City',
      iconColor: 'text-orange-400'
    }
  };

  const state = states[type] || states['no-data'];
  const Icon = state.icon;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-6 rounded-full">
            <Icon className={`w-16 h-16 ${state.iconColor}`} />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {state.title}
        </h3>
        
        <p className="text-gray-600 mb-6 text-lg">
          {state.description}
        </p>
        
        {onAction && (
          <button
            onClick={onAction}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium transition-all"
          >
            {state.actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;