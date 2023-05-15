const mysql = require("mysql");
const MySQLStore = require('express-mysql-session')(session);


//database config
const sqlOptions = {
    host : process.env.MYSQL_HOST,
    database : process.env.MYSQL_DBNAME,
    user : process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
};
const makeQuery = mysql.createConnection(sqlOptions)
module.exports.makeQuery = makeQuery;
// End 