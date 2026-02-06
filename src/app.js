const express = require("express");
const app = express();

const products = require("./routes/products");
const webhook = require("./routes/webhook");
const auth = require("./middleware/authMiddleware");
const rateLimiter = require("./middleware/rateLimiter");

app.use(express.json());

// public route
app.use("/webhook", webhook);

// protected route
app.use("/products", auth, rateLimiter, products);

app.get("/", (req, res) => {
  res.send("Server running OK");
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

module.exports = app;
