const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "host.docker.internal",
  user: "root",
  password: "",
  database: "users_db1",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();
module.exports = db;
