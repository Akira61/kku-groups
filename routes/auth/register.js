require("dotenv").config();
const express = require('express');
const nodeMailer = require("nodemailer");
const bcrypt = require("bcrypt");
const util = require("util");
const { makeQuery } = require("../../server");
const router = express.Router();


router.get("/register", (req, res) => {
    res.render('register.ejs')
}); 

let verificationCode;// the code that will be sent to user to verify email
let studentData = {}; // to save student data in the DB after verifying the email


// verify email and save user
router.post("/register/verify", (req, res) => {
    const {code} = req.body;
    console.log(code);
    console.log(verificationCode);
    console.log(studentData);

    //check if code expires
    if(!verificationCode){
        return res.status(404).json({err_msg : "Code Expires. try again"});
    }
    else if (code != verificationCode){
        return res.status(500).json({err_msg : "Code Uncorrect"});
    }
    console.log("correct code");
    //save studient
        const query = `
            INSERT INTO students 
            (name,email, password, role)
            VALUES (?,?, ?, ?)
        `
        makeQuery.query(query, [
            studentData.name,
            studentData.username,
            studentData.hashedPass,
            studentData.role
        ], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.json({success : true})
        });
    //End
        
    // res.redirect("/login");// reditect to login to set session


    //clear verification code and client data
        verificationCode = undefined;
        studentData = {};
    //End
})


// data that comes from client
router.post("/register", async(req, res) => {
    console.log(req.body);
    const {username, name, password} = req.body;
    const role = "student";

    const atSigen = username.indexOf('@');
    const emailHost = username.slice(atSigen);
    const studentNum = username.slice(0,atSigen);
    const regex=/^[0-9]+$/;

    // check if fields filled
        if(!name || !username || !password){
            return res.status(500).json({err_msg : "Please Complete The Form"});
        }
    //End
 
    // Email validations
        if(emailHost !== '@kku.edu.sa'){
            console.log('unvalid Email');
            return res.status(500).json({err_msg : "Please Write Your kku Email"});
        }
        //check universty number
        else if(!regex.test(studentNum)){
            console.log("un valid student number");
            return res.status(500).json({err_msg : "Please Write Your kku Email"});
        }
        else if (studentNum.length !== 9){
            console.log(" student number must be 9 numbers");
            return res.status(500).json({err_msg : "Please Write Your kku Email"});
        }
    //End Email validations

    //verify password
        if(password.length < 8){
            return res.status(500).json({err_msg : "Password Must Be 8 Characters Or Longer"});
        }
        
        const hashedPass = await bcrypt.hash(password, 10);//hash password
    //End

    //Find if student already exists
        const asyncQuery = util.promisify(makeQuery.query).bind(makeQuery); // make query async/await
        const studentExists = await asyncQuery("SELECT * FROM students WHERE email=?", [username]);
        console.log(studentExists);
        if(studentExists.length > 0){ // if greater then 0 , that means student already exists
            return res.json({err_msg : "Student Already Exists"});
        }  
    //End 
 
    //send verification code and save user after verification
        sendEmail(username,name, res);
    //End
    
    // set student data to 'studentData' variable to be accessbule after verification
        studentData = {name, username,hashedPass, role};
    //End
    
});
 

//fucntion for sending emails
async function sendEmail(Email, Name,res) {
    //host settings
    const sender = nodeMailer.createTransport({
        service : process.env.host,// gmail, outlook etc..
        auth : {
            user : process.env.email,// email of the sender
            pass : process.env.pass, // email password
        }
    });
 
    //send email
    const verifyCode = Math.floor(100000 + Math.random() * 900000);// verifiction code
    verificationCode = verifyCode;
 
    const info = await sender.sendMail({
        from : process.env.email, //your email
        to : Email,
        subject : `Verification Code`,
        html : `<h1>${Name} Please verify this email : ${Email}.
        <p> verify code : ${verifyCode}</p>
        `
    });
    console.log(info);

    // clear verification code and request data after 2 minutes
        setTimeout(() => {
            verificationCode = undefined;
            studentData = {};
        },120000);
    //End 
    res.json({success : "We sent a verification code"})
    // const hashVerifyCode = await bcrypt.hash(toString(verificationCode),8);
    // res.cookie('verify',hashVerifyCode, { maxAge: 900000, httpOnly: true });
}


module.exports = router;