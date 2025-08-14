// 1c. controllers/pageviewController.js
const mongoose = require('mongoose');
const Pageview = require('../models/Pageview');

// Helper to group by period
exports.getPageviews = async (req, res, next) => {
  const { period = 'daily' } = req.query; // 'daily', 'weekly', 'monthly'
  try {
    let groupBy;
    if (period === 'weekly') {
      groupBy = { $dateTrunc: { date: '$timestamp', unit: 'week' } };
    } else if (period === 'monthly') {
      groupBy = { $dateTrunc: { date: '$timestamp', unit: 'month' } };
    } else {
      groupBy = { $dateTrunc: { date: '$timestamp', unit: 'day' } };
    }
    const stats = await Pageview.aggregate([
      { $group: { _id: groupBy, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    // Format output
    const result = stats.map(s => ({
      period: s._id.toISOString().split('T')[0],
      count: s.count
    }));
    res.json(result);
  } catch (err) {
    next(err);
  }
};
