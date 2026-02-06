module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid authorization format" });
  }

  const token = parts[1];

  if (!process.env.TEST_OAUTH_TOKEN) {
    return res.status(500).json({ message: "Auth not configured" });
  }

  if (token !== process.env.TEST_OAUTH_TOKEN) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  next();
};
 