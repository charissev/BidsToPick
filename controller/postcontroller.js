const User = require('../model/usersSchema.js');
const Post = require('../model/postSchema.js');
const path = require('path');
const fs = require('fs');

const postcontroller = {

    deletePost: function (req, res){
        const postID = req.params.postID;

        Post.findOne({_id: postID}, function(err, postImgDocs) {
            if (err){
                console.log(err);
            } else{
                const imgRemove = path.resolve(__dirname + '/..' + "/public/"+ postImgDocs.postImg)
                fs.unlink(imgRemove, (err)=>{
                    if (err){
                        console.log(err);
                    } else{
                        console.log("Deleted post image successfully.");
                    }
                })
            }
        });

        Post.findOneAndDelete({_id: postID}, function(err, docs) {
            if (err){
                console.log(err);
            } else{
                console.log("Deleted post from database successfully.");
                res.redirect('/home');
            }
        });
    },

    comment: function (req, res){
        const postID = req.params.postID;
        const commentDetails = req.body.commentDetails;
        console.log("Will be commenting on: " + postID);

        // push adds one the the array
        Post.updateOne({_id: postID}, 
            { $push:
                {
                    comments: {
                        commentedBy: req.session.userName,
                        commentDetails: commentDetails
                     }
                }
            }
            , null, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Commented successfully");
                res.redirect('/home'); 
            }
        });

    },

    likePost: function (req, res){
        const postID = req.params.postID;
        const likerUserName = req.session.userName;
        console.log("LIKING: " + postID);

        //increment likes
        Post.findOneAndUpdate( {_id: postID}, 
            {$inc : {'likes' : 1}}, // 1 = increment
            {new: true},
            function(err, response) {
                console.log("Incremented like.")
        });

        // add user to post likers
        Post.updateOne({_id: postID}, 
            { $push: // push adds to array
                {
                    likers: {
                        likerUserName: likerUserName
                    }
                }
            }
            , null, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Liked successfully.");
                res.redirect('/home'); 
            }
        });
    },

    unlikePost: function (req, res){
        const postID = req.params.postID;
        const likerUserName = req.session.userName;

        //decrement likes
        Post.findOneAndUpdate( {_id: postID}, 
            {$inc : {'likes' : -1}}, // -1 = decrement
            {new: true},
            function(err, response) {
                console.log("Decremented like.")
        });

        // remove user from post likers
        Post.updateOne({_id: postID}, 
            { $pull: // pull removes from array
                {
                    likers: {
                        likerUserName: likerUserName
                    }
                }
            }
            , null, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Unliked successfully.");
                res.redirect('/home'); 
            }
        });

    },
}

module.exports = postcontroller;