const express = require("express");
const router = express.Router();
const redis = require("../config/redis");

router.post("/", async (req, res) => {
  const idempotencyKey = req.headers["idempotency-key"];

  if (!idempotencyKey) {
    return res.status(400).json({ error: "Missing idempotency key" });
  }

  const exists = await redis.get(idempotencyKey);
  if (exists) {
    return res.status(200).json({ status: "Already processed" });
  }

  // process webhook
  await redis.set(idempotencyKey, "done", { EX: 3600 });

  res.json({ status: "success" });
});

module.exports = router;
