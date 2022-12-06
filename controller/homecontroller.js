const User = require('../model/usersSchema.js');
const Post = require('../model/postSchema.js');

const homecontroller = {

    getHome: function (req, res){
        if (req.session.isAuth) {
            Post.find({}, function(err, docs) {
                if (err){
                    console.log(err)
                } else{
                    res.render('home', {posts: docs});
                }
            });
        }
        else {
            res.render('login', {loginPrompt: "Please Login First"});
        }
    },

    getAboutUs: function (req, res){
        if(req.session.isAuth) {
            res.render('aboutus');
        }
        else {
            res.render('login', {loginPrompt: "Please Login First"});
        }
    },

    getBiddingRules: function (req, res){
        if(req.session.isAuth) {
            res.render('biddingrules');
        }
        else {
            res.render('login', {loginPrompt: "Please Login First"});
        }
    },

    getSearchPopular: function (req, res){
        if(req.session.isAuth) {

            // sorts by descending order (-1) of post likes
            Post.find({}, null, {sort: { likes: -1}}, function (err, docs){
                if (err){
                    console.log(err);
                } else{
                    res.render('searchlanding', {posts: docs , searchCategory: "POPULAR ITEMS"});
                }
            });

        }
        else {
            res.render('login', {loginPrompt: "Please Login First"});
        }
    },

    getTextSearchResults: function (req, res){
        if(req.session.isAuth) {
            const searchQuery = req.body.searchquery;
            
            // checks for posts that contain searchQuery
            Post.find({itemName : {$regex : new RegExp(searchQuery, 'i')}}, function (err, docs){
                if (err){
                    console.log(err);
                } else{
                    res.render('searchlanding', {posts: docs , searchCategory: "search results for: "+ searchQuery});
                }
            });
        }
        else {
            res.render('login', {loginPrompt: "Please Login First"});
        }
    },
}

module.exports = homecontroller;

