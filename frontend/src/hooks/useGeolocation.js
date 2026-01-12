// USE GEOLOCATION HOOK

// frontend/src/hooks/useGeolocation.js
import { useEffect, useState } from 'react';

/**
 * Custom hook for browser geolocation
 * Returns coordinates, loading state, and error
 * Fetches location asynchronously without blocking - times out after 3 seconds
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

    // Set timeout to fail fast - mark as not loading after 3 seconds
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        console.log('⏱️ Geolocation timeout after 3s - showing default city');
      }
    }, 3000);

    // Get current position - non-blocking with shorter timeout
    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLoading(false);
        console.log('✅ Location detected:', position.coords);
      },
      (err) => {
        clearTimeout(timeoutId);
        setError(err.message);
        setLoading(false);
        console.log('⚠️ Location permission denied or failed, using default city');
      },
      {
        enableHighAccuracy: false,
        timeout: 3000, // Reduced timeout
        maximumAge: 300000 // Cache location for 5 minutes
      }
    );

    return () => clearTimeout(timeoutId);
  }, []);

  return { location, loading, error };
};