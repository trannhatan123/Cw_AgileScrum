const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Chưa xác thực (Missing token)' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>
  try {
    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Tìm user theo decoded.userId
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User không tồn tại' });
    }
    // Gán thông tin vào req.user: { userId, role }
    req.user = { userId: user._id, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
};
