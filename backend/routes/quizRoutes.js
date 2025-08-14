// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Lấy tất cả quiz (public)
router.get('/', quizController.getAllQuizzes);

// Lấy quiz theo ID (admin) – đặt trước slug để ưu tiên khớp
router.get('/:id',
  protect,
  authorize('admin'),
  quizController.getQuizById
);

// Lấy quiz theo slug (public)
router.get('/slug/:slug', quizController.getQuizBySlug);

// Tạo, Cập nhật, Xóa (admin)
router.post('/', protect, authorize('admin'), quizController.createQuiz);
router.put('/:id', protect, authorize('admin'), quizController.updateQuiz);
router.delete('/:id', protect, authorize('admin'), quizController.deleteQuiz);

module.exports = router;
