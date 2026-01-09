// PREFERENCE API SERVICE

// frontend/src/services/preferenceApi.js
import api from '../config/api.js';

/**
 * Get user preferences
 */
export const getUserPreferences = async (userId) => {
  try {
    const response = await api.get(`/preferences/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch preferences');
  }
};

/**
 * Update user preferences
 */
export const updateUserPreferences = async (userId, preferences) => {
  try {
    const response = await api.put(`/preferences/${userId}`, preferences);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update preferences');
  }
};

/**
 * Add city to recent searches
 */
export const addRecentSearch = async (userId, cityData) => {
  try {
    const response = await api.post(`/preferences/${userId}/recent-search`, cityData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add recent search');
  }
};

/**
 * Clear recent searches
 */
export const clearRecentSearches = async (userId) => {
  try {
    const response = await api.delete(`/preferences/${userId}/recent-searches`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to clear recent searches');
  }
};