// PREFERENCE CONTROLLER

// backend/controllers/preferenceController.js
import UserPreference from '../models/UserPreference.js';

/**
 * Get user preferences
 * Route: GET /api/preferences/:userId
 */
export const getUserPreferences = async (req, res) => {
  try {
    const { userId } = req.params;

    let preferences = await UserPreference.findOne({ userId });

    // Create default preferences if not found
    if (!preferences) {
      preferences = await UserPreference.create({
        userId,
        defaultCity: {
          name: 'New Delhi',
          coordinates: { lat: 28.6139, lon: 77.2090 }
        },
        temperatureUnit: 'celsius',
        recentSearches: []
      });
    }

    res.status(200).json({
      success: true,
      data: preferences
    });
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user preferences'
    });
  }
};

/**
 * Update user preferences
 * Route: PUT /api/preferences/:userId
 */
export const updateUserPreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const preferences = await UserPreference.findOneAndUpdate(
      { userId },
      { 
        ...updates,
        lastActive: new Date()
      },
      { 
        new: true, 
        upsert: true,
        runValidators: true 
      }
    );

    res.status(200).json({
      success: true,
      data: preferences,
      message: 'Preferences updated successfully'
    });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user preferences'
    });
  }
};

/**
 * Add city to recent searches
 * Route: POST /api/preferences/:userId/recent-search
 */
export const addRecentSearch = async (req, res) => {
  try {
    const { userId } = req.params;
    const { cityName, coordinates } = req.body;

    if (!cityName || !coordinates) {
      return res.status(400).json({
        success: false,
        message: 'City name and coordinates are required'
      });
    }

    let preferences = await UserPreference.findOne({ userId });

    if (!preferences) {
      // Create new preferences with this search
      preferences = await UserPreference.create({
        userId,
        recentSearches: [{
          cityName,
          coordinates,
          searchedAt: new Date()
        }]
      });
    } else {
      // Remove duplicate if exists
      preferences.recentSearches = preferences.recentSearches.filter(
        search => search.cityName.toLowerCase() !== cityName.toLowerCase()
      );

      // Add to beginning of array
      preferences.recentSearches.unshift({
        cityName,
        coordinates,
        searchedAt: new Date()
      });

      // Keep only last 10 searches
      if (preferences.recentSearches.length > 10) {
        preferences.recentSearches = preferences.recentSearches.slice(0, 10);
      }

      preferences.lastActive = new Date();
      await preferences.save();
    }

    res.status(200).json({
      success: true,
      data: preferences,
      message: 'Recent search added successfully'
    });
  } catch (error) {
    console.error('Error adding recent search:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add recent search'
    });
  }
};

/**
 * Clear recent searches
 * Route: DELETE /api/preferences/:userId/recent-searches
 */
export const clearRecentSearches = async (req, res) => {
  try {
    const { userId } = req.params;

    const preferences = await UserPreference.findOneAndUpdate(
      { userId },
      { 
        recentSearches: [],
        lastActive: new Date()
      },
      { new: true }
    );

    if (!preferences) {
      return res.status(404).json({
        success: false,
        message: 'User preferences not found'
      });
    }

    res.status(200).json({
      success: true,
      data: preferences,
      message: 'Recent searches cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing recent searches:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear recent searches'
    });
  }
};