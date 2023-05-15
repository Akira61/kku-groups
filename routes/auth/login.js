require("dotenv").config();
const express = require('express');
const session = require("express-session");
const nodeMailer = require("nodemailer");
const bcrypt = require("bcrypt");
const util = require("util");
const { makeQuery } = require("../../server");
const router = express.Router();



router.get("/login", (req, res) => {
    if(req.session.auth){
        console.log("already")
        return res.redirect("/")
    }
    console.log(req.session)
    res.render("login.ejs");
});


router.post("/login", async(req, res) => {
    const {email} = req.body;
    const {password} = req.body;
    console.log(req.body);

    if(!email || !password){
        return res.status(500).json({err_msg : "Please Complete the Fields"});
    }

    const asyncQuery = util.promisify(makeQuery.query).bind(makeQuery); // make query async/await
    const query = "SELECT * FROM students WHERE email=?";
    const student = await asyncQuery(query,[email]);

    console.log(student)
    // check if student exists
        if(student.length == 0){
            return res.json({err_msg : "No Student Found. Please Try To <a href='/register'>Register</a>"})
        }
    //End

    // comapire password
        const correctPass = await bcrypt.compare(password, student[0]['password']);
        if(!correctPass){
            return res.json({err_msg : "Uncorrect Password"});
        }
    //End

    //set session
        if(correctPass){
            req.session.auth = true;
            req.session.student = student[0];
        }
    //End
    console.log('session maide');
    console.log(req.session);

    // makeQuery.query(query, [email], async (err, result) => {
    //     if (err) throw err;

    //     // check if student exists
    //         if(result.length == 0){
    //             return res.json({err_msg : "No Student Found. Please Try To <a href='/register'>Register</a>"})
    //         }
    //     //End

    //     // comapire password
    //         const correctPass = await bcrypt.compare(password, result[0]['password']);
    //         if(!correctPass){
    //             return res.json({err_msg : "Uncorrect Password"});
    //         }
    //     //End

    //     //set session
    //         req.session.auth = true;
    //         req.session.student = result[0];
    //     //End
    //     console.log('session maide');
    //     //res.redirect("/");
    // })
});



module.exports = router;