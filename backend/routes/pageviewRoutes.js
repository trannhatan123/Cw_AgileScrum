// 1d. routes/pageviewRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware')
const pageviewController = require('../controllers/pageviewController');

// GET /api/admin/analytics/pageviews?period=
router.get('/pageviews', protect, authorize('admin'), pageviewController.getPageviews);
module.exports = router;
