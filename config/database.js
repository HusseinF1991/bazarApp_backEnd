const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "u7FjW!xfDG@4qd",
  database: "bazarapp"
});

module.exports = con;