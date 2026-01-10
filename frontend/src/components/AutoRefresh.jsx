// AUTO REFRESH COMPONENT

// frontend/src/components/AutoRefresh.jsx
import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

const AutoRefresh = ({ onRefresh, interval = 600000 }) => { // Default 10 minutes
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(interval / 1000);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Auto refresh timer
  useEffect(() => {
    const timer = setInterval(() => {
      handleRefresh();
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  // Countdown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      const elapsed = Date.now() - lastRefresh;
      const remaining = Math.max(0, (interval - elapsed) / 1000);
      setTimeLeft(Math.ceil(remaining));
    }, 1000);

    return () => clearInterval(countdown);
  }, [lastRefresh, interval]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setLastRefresh(Date.now());
    setTimeLeft(interval / 1000);
    setIsRefreshing(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 shadow-md">
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-all disabled:opacity-50"
        title="Refresh now"
      >
        <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        <span className="text-sm font-medium">Refresh</span>
      </button>
      <div className="h-10 w-px bg-black-300"></div>
      <div className="text-sm text-gray-900">
        Next: <span className="font-semibold text-gray-900">{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
};

export default AutoRefresh;