const { createClient } = require("redis");

let redis = null;

(async () => {
  try {
    redis = createClient({
      url: process.env.REDIS_URL
    });

    redis.on("error", (err) => {
      console.error("Redis error:", err.message);
    });

    await redis.connect();
    console.log("Redis connected");
  } catch (err) {
    console.warn("Redis not available, continuing without cache");
    redis = null;
  }
})();

module.exports = redis;
