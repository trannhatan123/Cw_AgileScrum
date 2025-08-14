// controllers/userController.js
const mongoose = require('mongoose');
const User = require('../models/User');

// GET /api/users?page&limit (admin) with pagination
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;
    const total = await User.countDocuments();
    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .lean();
    res.json({
      data: users,
      meta: { total, page, pages: Math.ceil(total / limit) }
    });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email has been registered' });
    }

    // Tạo mới user (pre-save hook sẽ hash password)
    const user = await User.create({ name, email, password, role });
    // Trả về user (không kèm password)
    const { password: _, ...rest } = user.toObject();
    res.status(201).json(rest);
  } catch (err) {
    next(err);
  }
};

// GET /api/users/:id (admin)
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const user = await User.findById(id).select('-password').lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/:id (admin)
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
        // Lấy document gốc để so sánh
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // push mỗi thay đổi vào history
    const updatable = { ...req.body };
    delete updatable.password;
    Object.keys(updatable).forEach(field => {
      if (user[field] !== updatable[field]) {
        user.history.push({
          field,
          oldValue: user[field],
          newValue: updatable[field]
        });
        user[field] = updatable[field];
      }
    });
    // Lưu luôn cả history và field mới
    await user.save();
    user.password = undefined; // loại bỏ password trước trả về
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/:id/password (admin)
exports.updateUserPassword = async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.password = password;
    await user.save(); // pre-save hook hashes password
    res.json({ message: 'Password updated' });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/users/:id (admin)
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};
