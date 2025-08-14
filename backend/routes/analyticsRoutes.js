// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware')
const analyticsController = require('../controllers/analyticsController');

// Thống kê tổng quan (existing)
router.get('/stats', protect, authorize('admin'), analyticsController.getStats);

// Top viewed Planets/Quizzes
router.get('/popular', protect, authorize('admin'), analyticsController.getPopular);

// Quiz completion rate
router.get('/quiz-completion', protect, authorize('admin'), analyticsController.getQuizCompletion);


module.exports = router;