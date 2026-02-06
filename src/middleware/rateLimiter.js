const rateLimit = require("express-rate-limit");
const { createClient } = require("redis");
const RedisStore = require("rate-limit-redis").default;

let redisClient;

try {
  redisClient = createClient({
    url: process.env.REDIS_URL
  });

  redisClient.connect().catch(() => {
    console.warn("Redis not available for rate limiting");
  });
} catch (err) {
  console.warn("Redis init failed, rate limiter will use memory");
}

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: redisClient
    ? new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args)
      })
    : undefined,
  message: {
    success: false,
    message: "Too many requests, please try again later"
  }
});

module.exports = limiter;
