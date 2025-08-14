// controllers/analyticsController.js
const User = require('../models/User');
const Planet = require('../models/Planet');
const Quiz = require('../models/Quiz');
const Event = require('../models/Event');
const Pageview   = require('../models/Pageview');

exports.getStats = async (req, res, next) => {
  try {
    // Total counts
    const [userCount, planetCount, quizCount, eventCount] = await Promise.all([
      User.countDocuments(),
      Planet.countDocuments(),
      Quiz.countDocuments(),
      Event.countDocuments()
    ]);

    // New users per month (last 6 months)
    const now = new Date();
    const months = [...Array(6)].map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return d;
    }).reverse();

    const usersByMonth = await Promise.all(months.map(async date => {
      const start = date;
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      const count = await User.countDocuments({ createdAt: { $gte: start, $lt: end } });
      return { month: date.toLocaleString('default', { month: 'short', year: 'numeric' }), count };
    }));

    res.json({
      totals: { userCount, planetCount, quizCount, eventCount },
      usersByMonth
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/analytics/popular?type=planets|quizzes&limit=5
exports.getPopular = async (req, res, next) => {
  try {
    const { type = 'planets', limit = 5 } = req.query;
    const prefix = type === 'quizzes' ? '/quizzes/' : '/planets/';
    // Nhóm theo đường dẫn và đếm
    const popular = await Pageview.aggregate([
      { $match: { path: { $regex: `^${prefix}` } } },
      { $group: { _id: '$path', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: parseInt(limit, 10) }
    ]);                                            
    const ids = popular.map(p => p._id.split('/').pop());
    const Model = type === 'quizzes' ? Quiz : Planet;
    const docs  = await Model.find({ _id: { $in: ids } }).lean();
    const result = popular.map(p => {
      const idDoc = p._id.split('/').pop();
      const doc   = docs.find(d => d._id.toString() === idDoc);
      return {
        id:    idDoc,
        label: doc ? (type==='quizzes'? doc.title : doc.name) : idDoc,
        views: p.views
      };
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};
// controllers/analyticsController.js (tiếp)
  
// GET /api/admin/analytics/quiz-completion[?quizId=…]
exports.getQuizCompletion = async (req, res, next) => {
  try {
    const { quizId } = req.query;
    // Lấy tất cả kết quả hoặc chỉ của 1 quiz
    const users = await User.find(
      quizId ? { 'quizResults.quiz': quizId } : { 'quizResults.0': { $exists: true } },
      'quizResults'
    ).lean();

    let totalCorrect = 0, totalAnswers = 0;
    users.forEach(u => {
      u.quizResults.forEach(r => {
        if (!quizId || r.quiz.toString() === quizId) {
          totalCorrect += r.score;
          totalAnswers += r.score >= 0 ? r.score /*score lưu số đúng*/ : 0; 
          // giả sử score là số câu đúng, totalAnswers += tổng câu; 
          // nhưng User model chưa lưu total câu – nếu cần, bạn có thể lưu thêm field totalQuestions.
        }
      });
    });

    const percent = totalAnswers
      ? Math.round((totalCorrect / (users.length * /* giả định totalQuestions*/10)) * 100)
      : 0;

    res.json({ totalCorrect, totalAnswers, percent });
  } catch (err) {
    next(err);
  }
};
