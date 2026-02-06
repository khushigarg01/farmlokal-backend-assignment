require("dotenv").config({ override: true });

console.log("MYSQL PASSWORD IS:", process.env.MYSQL_PASSWORD);

const app = require("./app");

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server failed to start:", err.message);
  process.exit(1);
});
