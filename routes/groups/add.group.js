require("dotenv").config();
const express = require('express');
const fileupload = require("express-fileupload")
const nodeMailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const util = require("util");
const { makeQuery } = require("../../server");
const path = require("path");
const router = express.Router();

router.use(fileupload({createParentPath : true}));

// universites that will show up in the select bar
const universities = ['King Khalid University', 'king Sauid University'];

router.get("/groups/new-group", (req, res) => {// require being loggedin
    res.render("add.group.ejs", { university :universities});
})


router.post("/add-group/select-element", (req, res) => {
    console.log(req.body);
    const {university} = req.body;

    if(!universities.includes(university)){
        return res.status(500).json({err_msg : "Please Choose One Of The Options"});
    }
})

router.post("/groups/insert-group", (req, res) => {
    console.log(req.body);
    const {
        groupName,subjectName, sectionNumber,
        gender,groupType,groupLink
    } = req.body;
    const {thumbnail} = req.files;

    //check if fields are filled
        if(!groupName || !subjectName || !sectionNumber || !groupLink){
            return res.status(500).json({err_msg : "Please Complete The Form"});
        }
    //End

    //check if gender on the list
        const genderList = ['male','female'];
        if(!genderList.includes(gender.toLowerCase())){
            return res.status(500).json({err_msg: 'Gender Unvalid. Please Choose One of the options'});
        }
    //End

    //check if group type on the list
        const groupTypeList = ['whatsapp','telegram','other'];
        if(!groupTypeList.includes(groupType.toLowerCase())){
            return res.status(500).json({err_msg: 'group type Unvalid. Please Choose One of the options'});
        }
    //End

    //check if group exists with the same type
    //end

    // save file
        const fileName = crypto.randomUUID() + thumbnail.name;
        fileName.split(" ").join("");
        const filePath = path.join(__dirname,'../../public/uploads/group_thumbnails/' + fileName)
    //End

    //Insert group
        const query = "INSERT INTO `groups`(`author`,`group_id`,`group_name`,`subject_name`,`section_number`,`group_link`,`group_thumbnail`,`gender`,`group_type`) VALUES (?,?,?,?,?,?,?,?,?);"
        // values of the INSERT query
        const values = [1,crypto.randomUUID(),groupName,subjectName,sectionNumber,groupLink,fileName,gender,groupType];
        makeQuery.query(query, values ,(err, reult) => {
            if(err) throw err;
            console.log(reult);
            //save thumbnail
                thumbnail.mv(filePath);
            //End

            //send success verification
            res.status(200).json({success : true});
        })
    //End
});

module.exports = router;