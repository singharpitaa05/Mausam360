// USE GEOLOCATION HOOK

// frontend/src/hooks/useGeolocation.js
import { useEffect, useState } from 'react';

/**
 * Custom hook for browser geolocation
 * Returns coordinates, loading state, and error
 */
export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    // Get current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLoading(false);
        console.log('✅ Location detected:', position.coords);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
        console.log('⚠️ Location permission denied, using default city');
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, []);

  return { location, loading, error };
};