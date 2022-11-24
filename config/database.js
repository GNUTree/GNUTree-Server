const mysql = require("mysql2/promise");
const { logger } = require("./winston");
require("dotenv").config();

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: "3306",
  password: process.env.DB_PASSWORD,
  database: "GNUTree",
  dateStrings: "date", //설정하지 않으면 '2020-05-06T15:41:24.000Z' 형태로 출력함
});

module.exports = {
  pool: pool,
};
