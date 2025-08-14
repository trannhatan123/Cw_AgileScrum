// config/database.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    // Chỉ truyền URI vào, bỏ hai tùy chọn useNewUrlParser và useUnifiedTopology
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected thành công');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
