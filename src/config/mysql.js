require("dotenv").config(); 

const mysql = require("mysql2/promise");

console.log("MYSQL PASSWORD IS:", process.env.MYSQL_PASSWORD);

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  charset: "utf8mb4",
  timezone: "Z"
});

// test DB connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL connected");
    connection.release();
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
    process.exit(1);
  }
})();

module.exports = pool;
