// FORECAST TABS COMPONENT

// frontend/src/components/ForecastTabs.jsx
import { Calendar, Clock, CloudSun } from 'lucide-react';

const ForecastTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'current', label: 'Current', icon: CloudSun },
    { id: 'hourly', label: 'Hourly', icon: Clock },
    { id: 'weekly', label: '7-Day', icon: Calendar }
  ];

  return (
    <div className="w-full mb-8">
      <div className="glass-card p-2 flex gap-2 w-full sm:w-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                isActive
                  ? 'bg-linear-gradient-to-br from-accent-primary to-accent-tertiary text-dark-bg-primary shadow-lg transform scale-105'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastTabs;