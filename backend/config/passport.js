// backend/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

// Serialize user vào session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user từ session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Cấu hình Google OAuth2 Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // VD: http://localhost:5000/api/auth/google/callback
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Tìm user theo googleId
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // Nếu chưa có, tạo mới
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatarUrl:
              profile.photos && profile.photos.length
                ? profile.photos[0].value
                : undefined,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// ===== Facebook OAuth2 Strategy =====
passport.use(
  new FacebookStrategy(
    {
      clientID:     process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:  process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'emails', 'photos']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          user = await User.create({
            facebookId: profile.id,
            name:       profile.displayName,
            email:      profile.emails?.[0]?.value,
            avatarUrl:  profile.photos?.[0]?.value
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

 // Sessions
 passport.serializeUser((user, done) => done(null, user.id));
 passport.deserializeUser(async (id, done) => {
   const user = await User.findById(id);
   done(null, user);
 });
// Lưu ý: import file này ở đầu app.js trước khi mount routes:
// require('./config/passport');
