// backend/utils/jwt.js
const jwt = require('jsonwebtoken');

/**
 * Sinh JWT với payload tuỳ ý, sống trong 7 ngày.
 * @param {Object} payload – dữ liệu muốn nhúng vào token (ví dụ { userId, email }).
 * @returns {string} token
 */
function signJwt(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

module.exports = { signJwt };
