const Pool = require('pg').Pool
require("dotenv").config({path : ".env"});
const pool = new Pool({

    user: `${process.env.DB_user}`,
    password: `${process.env.DB_password}`,
    host: `${process.env.DB_host}`,
    port: process.env.DB_port,
    database: `${process.env.DB_database}`
});

module.exports = pool;