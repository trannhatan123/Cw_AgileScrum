// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { uploadImage } = require('../middleware/uploadImage');

// Public – user có thể xem list và detail theo slug
router.get('/', eventController.getAllEvents);
router.get('/slug/:slug', eventController.getEventBySlug);

// Admin – thao tác bằng ID
router.get('/:id', protect, authorize('admin'), eventController.getEventById);
 router.post('/', protect, authorize('admin'), uploadImage, eventController.createEvent );

router.put('/:id', protect, authorize('admin'), uploadImage, eventController.updateEvent);
router.delete('/:id', protect, authorize('admin'), eventController.deleteEvent);

module.exports = router;
