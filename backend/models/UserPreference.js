// USER PREFERENCE MODEL

// backend/models/UserPreference.js
import mongoose from 'mongoose';

/**
 * Schema for storing user preferences and settings
 * Stores default city, temperature unit, and search history
 */
const userPreferenceSchema = new mongoose.Schema({
  // Unique identifier for the user (can be session ID or user ID)
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  // Default city preference
  defaultCity: {
    name: {
      type: String,
      default: 'New Delhi'
    },
    coordinates: {
      lat: {
        type: Number,
        default: 28.6139
      },
      lon: {
        type: Number,
        default: 77.2090
      }
    }
  },
  
  // Temperature unit preference (Celsius or Fahrenheit)
  temperatureUnit: {
    type: String,
    enum: ['celsius', 'fahrenheit'],
    default: 'celsius'
  },
  
  // Recent search history (last 10 cities)
  recentSearches: [{
    cityName: String,
    coordinates: {
      lat: Number,
      lon: Number
    },
    searchedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Last active timestamp
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Limit recent searches to 10 items
userPreferenceSchema.pre('save', function(next) {
  if (this.recentSearches.length > 10) {
    this.recentSearches = this.recentSearches.slice(-10);
  }
  next();
});

const UserPreference = mongoose.model('UserPreference', userPreferenceSchema);

export default UserPreference;