// 1a. models/Pageview.js
const mongoose = require('mongoose');
const PageviewSchema = new mongoose.Schema({
  path: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Pageview', PageviewSchema);