const mysql = require('mysql');
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "users",
});

module.exports = pool;
