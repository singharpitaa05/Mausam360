// USER PREFERENCES HOOK

// frontend/src/hooks/useUserPreferences.js
import { useEffect, useState } from 'react';
import {
    addRecentSearch,
    clearRecentSearches,
    getUserPreferences,
    updateUserPreferences
} from '../services/preferenceApi.js';

// Generate or get userId from localStorage
const getUserId = () => {
  let userId = localStorage.getItem('mausam360_userId');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('mausam360_userId', userId);
  }
  return userId;
};

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = getUserId();

  // Fetch preferences on mount
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setLoading(true);
        const response = await getUserPreferences(userId);
        setPreferences(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching preferences:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [userId]);

  // Update preferences
  const updatePreferences = async (updates) => {
    try {
      const response = await updateUserPreferences(userId, updates);
      setPreferences(response.data);
      return response.data;
    } catch (err) {
      console.error('Error updating preferences:', err);
      throw err;
    }
  };

  // Add to recent searches
  const addToRecentSearches = async (cityName, coordinates) => {
    try {
      const response = await addRecentSearch(userId, { cityName, coordinates });
      setPreferences(response.data);
      return response.data;
    } catch (err) {
      console.error('Error adding recent search:', err);
      throw err;
    }
  };

  // Clear recent searches
  const clearRecent = async () => {
    try {
      const response = await clearRecentSearches(userId);
      setPreferences(response.data);
      return response.data;
    } catch (err) {
      console.error('Error clearing recent searches:', err);
      throw err;
    }
  };

  // Update default city
  const setDefaultCity = async (cityName, coordinates) => {
    try {
      const response = await updateUserPreferences(userId, {
        defaultCity: { name: cityName, coordinates }
      });
      setPreferences(response.data);
      return response.data;
    } catch (err) {
      console.error('Error setting default city:', err);
      throw err;
    }
  };

  // Update temperature unit
  const setTemperatureUnit = async (unit) => {
    try {
      const response = await updateUserPreferences(userId, {
        temperatureUnit: unit
      });
      setPreferences(response.data);
      return response.data;
    } catch (err) {
      console.error('Error setting temperature unit:', err);
      throw err;
    }
  };

  return {
    preferences,
    loading,
    error,
    updatePreferences,
    addToRecentSearches,
    clearRecent,
    setDefaultCity,
    setTemperatureUnit,
    userId
  };
};