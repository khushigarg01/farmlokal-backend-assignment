const express = require("express");
const router = express.Router();
const pool = require("../config/mysql");
const redis = require("../config/redis");

router.get("/", async (req, res, next) => {
  try {
    const { cursor, limit = 20, category, sort = "id" } = req.query;

    const allowedSortFields = ["id", "price", "name", "created_at"];
    const sortBy = allowedSortFields.includes(sort) ? sort : "id";

    const safeLimit = Math.min(Number(limit) || 20, 50);

    const cacheKey = `products:${cursor || 0}:${safeLimit}:${category || "all"}:${sortBy}`;

    // Redis read (safe)
    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) return res.json(JSON.parse(cached));
    }

    let query =
      "SELECT id, name, price, category, created_at FROM products WHERE 1=1";
    const params = [];

    if (cursor && sortBy === "id") {
      query += " AND id > ?";
      params.push(cursor);
    }

    if (category) {
      query += " AND category = ?";
      params.push(category);
    }

    query += ` ORDER BY ${sortBy} LIMIT ?`;
    params.push(safeLimit);

    const [rows] = await pool.query(query, params);

    const response = {
      nextCursor: rows.length ? rows[rows.length - 1].id : null,
      data: rows
    };

    // Redis write (safe)
    if (redis) {
      await redis.set(cacheKey, JSON.stringify(response), { EX: 60 });
    }

    res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
