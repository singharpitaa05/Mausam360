// NETWORK STATUS COMPONENT

// frontend/src/components/NetworkStatus.jsx
import { WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOffline(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOffline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom">
      <div className="bg-red-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
        <WifiOff className="w-5 h-5" />
        <div>
          <p className="font-semibold">No Internet Connection</p>
          <p className="text-sm opacity-90">Please check your network</p>
        </div>
      </div>
    </div>
  );
};

export default NetworkStatus;