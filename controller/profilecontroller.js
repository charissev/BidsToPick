const { redirect } = require('statuses');
const User = require('../model/usersSchema.js');
const Post = require('../model/postSchema.js');
const path = require('path');

const profilecontroller = {
    getProfile: function(req, res) {

        if(req.session.isAuth) {
            User.findOne({ userName: req.params.clickedUserName }, function (err, userdocs) {
                if (err){
                    console.log(err)
                }
                else{
                    Post.find({ postedBy: req.params.clickedUserName }, function (err, postdocs) {
                        if (err){
                            console.log(err)
                        }
                        else{
                            console.log("Profile selected.")
                            res.render('profile', {user: userdocs, posts: postdocs})
                        }
                    });
                }
            });
        }
        else {
            res.render('login', {loginPrompt: "Please Login First"});
        }

    },

    getProfileEdit: function(req, res) {

        if(req.session.isAuth) {
            User.findOne({ userName: req.session.userName }, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Profile edit selected.")
                    res.render('profileedit', {user: docs, profileEditPrompt: "", imagePrompt: ""})
                }
            });
            
        }
        else {
            res.render('login', {loginPrompt: "Please Login First"});
        }

    },

    saveProfileEdit: function(req, res) {

        if(req.session.isAuth) {

            const fname = req.body.fname;
            const lname = req.body.lname;
            const username = req.body.username;
            const bio = req.body.bio;
            const email = req.body.email;
            const pw1 = req.body.pw1;
            const pw2 = req.body.pw2;

            console.log("The input for password 1 is: " + pw1)
            console.log("The input for password 2 is: " + pw2)
            if (pw1 != pw2){
                User.findOne({ userName: req.session.userName }, function (err, docs) {
                    if (err){
                        console.log(err)
                    }
                    else{
                        res.render('profileedit', {user: docs, profileEditPrompt: "Please make passwords match"});
                    }
                });
            }
            else {
                if (!req.files){
                    User.updateOne({ userName: {$eq: req.session.userName} }, 
                        { 
                            firstName: fname,
                            lastName: lname,
                            userName: username,
                            bio: bio,
                            email: email,
                            password: pw1
                        }
                        , null, function (err, docs) {
                        if (err){
                            console.log(err)
                        }
                        else{
                            req.session.userName = username;
                            res.redirect("/profile/" + username);
                        }
                    });
                } else {

                    const profileImg = req.files.profileImg;
                    const userName = req.session.userName;
                    var extension = profileImg.name.split('.').pop().toUpperCase(); 
                    if (extension!="PNG" && extension!="JPG" && extension!="JPEG" && extension!="JFIF"){
                        res.render('profileedit',  {profileEditPrompt: "", imagePrompt: "Invalid file type! Please choose an image."});
                    }
            
                    profileImg.mv(path.resolve('public/images/dp',userName+"_dp."+extension),function(err) {
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Successful profile image upload!");
                        }
                    });
                    
                    const imgPath = '/images/dp/'+userName+"_dp"+"."+extension;

                    User.updateOne({ userName: {$eq: req.session.userName} }, 
                        { 
                            profileImg: imgPath,
                            firstName: fname,
                            lastName: lname,
                            userName: username,
                            bio: bio,
                            email: email,
                            password: pw1
                        }
                        , null, function (err, docs) {
                        if (err){
                            console.log(err)
                        }
                        else{
                            req.session.dp = imgPath;
                            req.session.userName = username;
                            res.redirect("/profile/" + username);
                        }
                    });
                }
            }
        }
        else {
            res.render('login', {loginPrompt: "Please Login First"});
        }

    }
}

module.exports = profilecontroller;