/* eslint-disable no-var */
var pool;
const mysql = require('mysql');
require('dotenv').config();

module.exports = {
  getPool() {
    return pool;
  },
  connect() {
    try {
      pool = mysql.createPool({
        // require configfile.js or just put connection detail here
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB,
      });
    } catch (e) {
      console.log('error during db connect');
    }
  },
};
