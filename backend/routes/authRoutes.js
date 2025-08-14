const express = require("express");
const passport = require("passport");
const router = express.Router();

// JWT helper
const { signJwt } = require("../utils/jwt");

// Auth middleware for protected routes
const { protect } = require("../middleware/authMiddleware");

// Controllers
const {
  register,
  resendConfirmation,
  confirmEmail,
  login,
  loginAdmin,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// -------- Google OAuth2 Routes --------
// 1. Start Google OAuth flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2. Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Generate JWT for authenticated user
    const token = signJwt({ userId: req.user._id, email: req.user.email });
    // Redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);

// —— Facebook OAuth2 ——
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = signJwt({ userId: req.user._id, email: req.user.email });
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);
// -------- Protected Route --------
// Get current user profile (requires JWT)
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// -------- Existing Auth Routes --------
// User registration and email confirmation
router.post("/register", register);
router.post("/resend-confirmation", resendConfirmation);
router.get("/confirm-email/:token", confirmEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Local authentication routes
router.post("/login", login);
router.post("/admin/login", loginAdmin);

module.exports = router;
