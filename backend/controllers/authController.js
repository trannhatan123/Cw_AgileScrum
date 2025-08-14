const User = require('../models/User');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { sendEmail } = require('../services/mailer');
const jwt = require('jsonwebtoken');

dotenv.config();

// JWT helper: token expires in 7 days
const generateToken = userId =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  let user, verificationToken;

  // 1) Check if user already exists
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      if (existing.isEmailVerified) {
        return res.status(400).json({ message: 'Email đã được sử dụng' });
      }
      return res.status(400).json({
        message:
          'Email đã đăng ký nhưng chưa xác minh. Vui lòng kiểm tra hộp thư hoặc gửi lại email xác nhận.',
      });
    }
  } catch (err) {
    console.error('[Register] Error checking existing user:', err);
    return res.status(500).json({ message: 'Lỗi server khi kiểm tra tài khoản', error: err.message });
  }

  // 2) Create user and verification token
  try {
    user = new User({ name, email, password });
    verificationToken = user.createEmailVerificationToken();
    await user.save();
  } catch (err) {
    console.error('[Register] Error creating user:', err);
    return res.status(500).json({ message: 'Lỗi server khi tạo tài khoản', error: err.message });
  }

  // 3) Send confirmation email
  try {
    const verifyURL = `${process.env.FRONTEND_URL}/confirm-email/${verificationToken}`;
    const html = `
      <p>Chào ${user.name},</p>
      <p>Click <a href="${verifyURL}">vào đây</a> để xác nhận email.</p>
      <p>Link sẽ hết hạn sau 1 giờ.</p>
    `;
    await sendEmail({ to: user.email, subject: 'Xác nhận email', html });
  } catch (mailErr) {
    console.error('[Register] Error sending confirmation email:', mailErr);
    // Rollback: delete the created user
    try {
      await User.findByIdAndDelete(user._id);
      console.log('[Register] Rolled back user due to mailer error');
    } catch (delErr) {
      console.error('[Register] Error rolling back user:', delErr);
    }
    return res.status(500).json({
      message: 'Đăng ký thất bại: không gửi được email xác nhận',
      error: mailErr.message,
    });
  }

  // 4) Success response
  return res.status(201).json({
    status: 'success',
    message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.',
  });
};

// POST /api/auth/resend-confirmation
exports.resendConfirmation = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email chưa từng được đăng ký' });
    }
    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email đã được xác minh trước đó' });
    }

    const verificationToken = user.createEmailVerificationToken();
    await user.save({ validateBeforeSave: false });
    const verifyURL = `${process.env.FRONTEND_URL}/confirm-email/${verificationToken}`;
    const html = `
      <p>Chào ${user.name},</p>
      <p>Vui lòng click <a href="${verifyURL}">vào đây</a> để xác nhận email của bạn.</p>
      <p>Link sẽ hết hạn sau 1 giờ.</p>
    `;
    await sendEmail({ to: user.email, subject: 'Gửi lại link xác nhận email', html });

    return res.status(200).json({ status: 'success', message: 'Đã gửi lại email xác nhận.' });
  } catch (err) {
    console.error('[ResendConfirmation] Error:', err);
    return res.status(500).json({ message: 'Lỗi server khi gửi lại email xác nhận', error: err.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mật khẩu' });
    }
    if (!user.isEmailVerified) {
      return res.status(400).json({ message: 'Vui lòng xác nhận email trước khi đăng nhập' });
    }
    const token = generateToken(user._id);
    return res.json({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl } });
  } catch (err) {
    console.error('[Login] Error:', err);
    return res.status(500).json({ message: 'Lỗi server khi đăng nhập', error: err.message });
  }
};

// POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email chưa được đăng ký' });
    }
    // Create reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const html = `
      <p>Chào ${user.name},</p>
      <p>Bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu. Nhấn vào <a href="${resetURL}">đây</a> để tạo mật khẩu mới.</p>
      <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
      <p>Link sẽ hết hạn sau 1 giờ.</p>
    `;
    await sendEmail({ to: user.email, subject: 'Đặt lại mật khẩu', html });

    return res.status(200).json({ status: 'success', message: 'Đã gửi email đặt lại mật khẩu.' });
  } catch (err) {
    console.error('[ForgotPassword] Error:', err);
    return res.status(500).json({ message: 'Lỗi server khi gửi email đặt lại mật khẩu', error: err.message });
  }
};

// POST /api/auth/reset-password/:token
exports.resetPassword = async (req, res) => {
  const rawToken = req.params.token;
  const { password, confirmPassword } = req.body;
  try {
    const tokenHash = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: tokenHash,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Mật khẩu và xác nhận không khớp' });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = generateToken(user._id);
    return res.status(200).json({ status: 'success', message: 'Đặt lại mật khẩu thành công.', token });
  } catch (err) {
    console.error('[ResetPassword] Error:', err);
    return res.status(500).json({ message: 'Lỗi server khi đặt lại mật khẩu', error: err.message });
  }
};

// GET /api/auth/confirm-email/:token
exports.confirmEmail = async (req, res) => {
  try {
    const rawToken = decodeURIComponent(req.params.token);
    const tokenHash = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');
    console.log('[ConfirmEmail] tokenHash:', tokenHash);

    const user = await User.findOne({
      emailVerificationToken: tokenHash,
      emailVerificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }

    // Idempotent behavior: if already verified
    if (user.isEmailVerified) {
      return res.status(200).json({ status: 'success', message: 'Email đã được xác minh trước đó.' });
    }

    user.isEmailVerified = true;
    // Keep token fields until actual expiry to allow re-click
    await user.save();

    return res.status(200).json({ status: 'success', message: 'Email đã được xác minh thành công.' });
  } catch (err) {
    console.error('[ConfirmEmail] Error verifying email:', err);
    return res.status(500).json({ message: 'Lỗi server khi xác thực email', error: err.message });
  }
};

// POST /api/auth/admin/login
exports.loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email và password là bắt buộc' });
    }
    const user = await User.findOne({ email });
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng / không có quyền' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('[LoginAdmin] Error:', err);
    return next(err);
  }
};
