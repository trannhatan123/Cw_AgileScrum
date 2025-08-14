// services/cache.js
const Redis = require('ioredis');

// Khởi tạo client kết nối Redis
// Nếu .env có REDIS_URL, nó sẽ tự lấy; nếu không, dùng mặc định localhost:6379
const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

/**
 * Lấy dữ liệu từ cache
 * @param {string} key
 * @returns {Promise<any|null>} parsed JSON hoặc null nếu không tồn tại
 */
async function getCache(key) {
  try {
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data);
  } catch (err) {
    console.error('Redis GET error:', err);
    return null;
  }
}

/**
 * Đặt dữ liệu vào cache với TTL (đơn vị: giây)
 * @param {string} key
 * @param {any} value
 * @param {number} ttlSeconds
 */
async function setCache(key, value, ttlSeconds = 300) {
  try {
    const json = JSON.stringify(value);
    await redis.set(key, json, 'EX', ttlSeconds);
  } catch (err) {
    console.error('Redis SET error:', err);
  }
}

/**
 * Xóa cache theo key
 * @param {string} key
 */
async function delCache(key) {
  try {
    await redis.del(key);
  } catch (err) {
    console.error('Redis DEL error:', err);
  }
}

module.exports = {
  getCache,
  setCache,
  delCache,
};
