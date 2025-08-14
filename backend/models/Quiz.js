// models/Quiz.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

// Schema lưu lịch sử trước khi update
const QuizHistorySchema = new mongoose.Schema({
  title: String,
  level: String,
  questions: [QuestionSchema],
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  level: {
    type: String,
    enum: ['basic', 'advanced'],
    default: 'basic',
  },
  questions: [QuestionSchema],
  history: [QuizHistorySchema],      // ← thêm mảng history
}, {
  timestamps: true,
});

// Pre-validate hook: generate slug
QuizSchema.pre('validate', async function(next) {
  if (this.title) {
    let newSlug = slugify(this.title, { lower: true, strict: true });
    const existing = await this.constructor.findOne({ slug: newSlug, _id: { $ne: this._id } });
    if (existing) newSlug = `${newSlug}-${Date.now()}`;
    this.slug = newSlug;
  }
  next();
});

module.exports = mongoose.model('Quiz', QuizSchema);
