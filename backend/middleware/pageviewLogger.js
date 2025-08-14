// 1b. middleware/pageviewLogger.js
const Pageview = require('../models/Pageview');
module.exports = async function pageviewLogger(req, res, next) {
  try {
    // Log only GET pageviews
    if (req.method === 'GET') {
      await Pageview.create({ path: req.path });
    }
  } catch (e) {
    console.warn('Pageview logging error:', e.message);
  }
  next();
};