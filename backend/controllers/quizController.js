// controllers/quizController.js
const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');

// GET /api/quizzes
exports.getAllQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    next(err);
  }
};

// GET /api/quizzes/slug/:slug  (public)
exports.getQuizBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const quiz = await Quiz.findOne({ slug }).lean();
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    next(err);
  }
};

// GET /api/quizzes/:id  (admin)
exports.getQuizById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid quiz ID' });
    }
    const quiz = await Quiz.findById(id).lean();
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    next(err);
  }
};

// POST /api/quizzes  (admin)
exports.createQuiz = async (req, res, next) => {
  try {
    const newQuiz = new Quiz(req.body);
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (err) {
    next(err);
  }
};

// PUT /api/quizzes/:id  (admin)
exports.updateQuiz = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid quiz ID' });
    }

    // 1) Lấy quiz gốc
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found to update' });
    }

    // 2) Đẩy bản ghi cũ vào history
    quiz.history.push({
      title: quiz.title,
      level: quiz.level,
      questions: quiz.questions.map(q => ({
        question: q.question,
        options: [...q.options],
        correctAnswer: q.correctAnswer
      })),
      updatedAt: new Date()
    });

    // 3) Gán giá trị mới từ req.body
    quiz.title = req.body.title ?? quiz.title;
    quiz.level = req.body.level ?? quiz.level;
    quiz.questions = Array.isArray(req.body.questions)
      ? req.body.questions
      : quiz.questions;

    // 4) Lưu lại document cùng history
    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } catch (err) {
    next(err);
  }
};
// DELETE /api/quizzes/:id  (admin)
exports.deleteQuiz = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid quiz ID' });
    }
    const removed = await Quiz.findByIdAndDelete(id);
    if (!removed) {
      return res.status(404).json({ message: 'Quiz not found to delete' });
    }
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    next(err);
  }
};
