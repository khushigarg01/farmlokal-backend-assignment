const redis = require("../config/redis");
const { v4: uuidv4 } = require("uuid");

const TOKEN_TTL = Number(process.env.TOKEN_EXPIRE) || 3600;

async function getAccessToken(clientId = "default") {
  const cacheKey = `oauth:access_token:${clientId}`;

  // try cache (if redis available)
  if (redis) {
    const cached = await redis.get(cacheKey);
    if (cached) return cached;
  }

  // simulate OAuth provider
  const token = uuidv4();

  // store in redis (optional)
  if (redis) {
    await redis.set(cacheKey, token, { EX: TOKEN_TTL });
  }

  return token;
}

module.exports = { getAccessToken };
