const express = require("express");
const { model } = require("mongoose");

const logincontroller = require('../controller/logincontroller.js');
const homecontroller = require('../controller/homecontroller.js');
const profilecontroller = require('../controller/profilecontroller.js');
const sellcontroller = require('../controller/sellcontroller.js');
const postcontroller = require('../controller/postcontroller.js');
const app = express();

//Login and Register
app.get("/", logincontroller.getLogin);
app.post("/", logincontroller.getLogin);
app.post("/login", logincontroller.checkLogin);
app.get("/signup", logincontroller.getRegister);
app.post("/signup", logincontroller.saveRegister);
app.get("/logout", logincontroller.getLogout);

//Home Page
app.get("/home", homecontroller.getHome);
app.get("/aboutus", homecontroller.getAboutUs);
app.get("/biddingrules", homecontroller.getBiddingRules);
app.get("/popularsearchlanding", homecontroller.getSearchPopular);
app.post("/textsearchlanding", homecontroller.getTextSearchResults);

//Profile
app.get("/profile/:clickedUserName", profilecontroller.getProfile);
app.get("/profileedit", profilecontroller.getProfileEdit);
app.post("/saveprofileedit", profilecontroller.saveProfileEdit);

//Selling
app.get("/sell", sellcontroller.getSell);
app.post("/sell", sellcontroller.postListing);

//Posts
app.get("/deletePost/:postID", postcontroller.deletePost);
app.get("/likePost/:postID", postcontroller.likePost);
app.get("/unlikePost/:postID", postcontroller.unlikePost);
app.post("/comment/:postID", postcontroller.comment);


module.exports = app;