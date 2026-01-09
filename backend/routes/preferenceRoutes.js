// PREFERENCE ROUTES

// backend/routes/preferenceRoutes.js
import express from 'express';
import * as preferenceController from '../controllers/preferenceController.js';

const router = express.Router();

/**
 * User Preferences Routes
 * Base path: /api/preferences
 */

// Get user preferences
// GET /api/preferences/:userId
router.get('/:userId', preferenceController.getUserPreferences);

// Update user preferences
// PUT /api/preferences/:userId
router.put('/:userId', preferenceController.updateUserPreferences);

// Add recent search
// POST /api/preferences/:userId/recent-search
router.post('/:userId/recent-search', preferenceController.addRecentSearch);

// Clear recent searches
// DELETE /api/preferences/:userId/recent-searches
router.delete('/:userId/recent-searches', preferenceController.clearRecentSearches);

export default router;