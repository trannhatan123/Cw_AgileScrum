const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const session = require('express-session');
const passport = require('passport');

// Cấu hình Passport (Google OAuth2 và các chiến lược khác)
require('./config/passport');

// Khởi tạo Express
const app = express();

// Kết nối tới MongoDB
connectDB();

// Middleware chung
app.use(cors());                    // cho phép cross-origin
app.use(express.json());            // parse JSON body

// Cấu hình session và Passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Serve static folder cho ảnh đã upload
// Khi client gọi GET /uploads/filename.jpg, Express sẽ trả file từ ./uploads/filename.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes - Auth (bao gồm Google OAuth2)
app.use('/api/auth',    require('./routes/authRoutes'));
app.use('/api/users',   require('./routes/userRoutes'));
app.use('/api/planets', require('./routes/planetRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/events',  require('./routes/eventRoutes'));
app.use('/api/admin/analytics', require('./routes/analyticsRoutes'));

// Pageview logging
const pageviewRoutes = require('./routes/pageviewRoutes');
const pageviewLogger = require('./middleware/pageviewLogger');
app.use(pageviewLogger);
app.use('/api/pageviews', pageviewRoutes);

// Lắng nghe port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔊 Server đang chạy trên port ${PORT}`);
});
