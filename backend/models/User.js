const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const QuizResultSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  score: {
    type: Number,
    default: 0,
  },
  takenAt: {
    type: Date,
    default: Date.now,
  },
});

// sub‐doc để ghi lại lịch sử thay đổi
const UserHistorySchema = new mongoose.Schema(
  {
    field: { type: String, required: true },
    oldValue: { type: mongoose.Schema.Types.Mixed },
    newValue: { type: mongoose.Schema.Types.Mixed },
  },
  {
    timestamps: true,
    _id: false,
  }
);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "No Name",
    },
    email: {
      type: String,
      required: true,
      unique: true, // email duy nhất
    },

    // ---------- OAuth fields ----------
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allow many docs without googleId
    },
    avatarUrl: {
      type: String,
      default: "", // profile picture from Google
    },
    facebookId: { type: String, unique: true, sparse: true },
    avatarUrl: { type: String, default: "" },

    // ---------- Password fields ----------
    password: {
      type: String,
      // không bắt buộc: Google user không có password nội bộ
    },
    passwordResetToken: String,
    passwordResetExpires: Date,

    // ---------- Email verification ----------
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationTokenExpires: Date,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    quizResults: [QuizResultSchema],
    history: [UserHistorySchema],
  },
  {
    timestamps: true,
  }
);

// Sinh token xác thực email
UserSchema.methods.createEmailVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.emailVerificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
  return token;
};

// Phương thức tạo token reset password
UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;
  return resetToken;
};

// Hash mật khẩu trước khi lưu user (chỉ khi password được set/modify)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method để so sánh mật khẩu khi login (nếu có password)
UserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) {
    // user không có mật khẩu (đăng nhập Google) ⇒ luôn false
    return false;
  }
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
