require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const MySQLStore = require('express-mysql-session')(session);
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const app = express();

//Middlewares
    app.set('view engine', 'ejs');
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json({limit : '50mb'}));
    app.use(cors({origin: ['*'],optionsSuccessStatus: 200,credentials: true,}));
    app.use(helmet({contentSecurityPolicy: false}));
//End

//database config
    const sqlOptions = {
        host : process.env.MYSQL_HOST,
        database : process.env.MYSQL_DBNAME,
        user : process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
    };
    const makeQuery = mysql.createConnection(sqlOptions)
    module.exports.makeQuery = makeQuery;
    module.exports.sqlOptions = sqlOptions;
// End 

//session
    const sessionStore = new MySQLStore(sqlOptions);
    app.use(session({
        secret : process.env.session_secret,// random characters for hashing the session
        resave : false,
        //to prevent setting a new session every request
        saveUninitialized : false,
        // cookie : {
        //     maxAge :  14 * 24 * 3600000,// 14 days
        //     // httpOnly: true, 
            secure: app.get('env') === 'production'?true:false,
        // },
        store : sessionStore,
    }))
//End


//**************** Routes *******************

app.get("/hi", (req, res) => {
    res.render("add.group.html")
})

//Authentication Routes
    app.use("/", require("./routes/auth/register"));//register

    app.use("/", require("./routes/auth/login"));//login
//End

// groups Routes
    app.use("/", require('./routes/groups/add.group')); // add new group
//End
 
app.listen(5454, console.log('listening on port 5454'));