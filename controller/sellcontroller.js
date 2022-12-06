const User = require('../model/usersSchema.js');
const Post = require('../model/postSchema.js');
const path = require('path');

const sellcontroller = {
    getSell: function(req, res) {
        if(req.session.isAuth) {
            res.render('sell', {imagePrompt: ""});
        }
        else {
            res.render('login', {loginPrompt: "Please Login First"});
        }       
    },

    postListing: function(req, res) {

        if(req.session.isAuth) {
            const userName = req.session.userName;
            const postImg = req.files.postImg;
            
            var extension = postImg.name.split('.').pop().toUpperCase(); 
            if (extension!="PNG" && extension!="JPG" && extension!="JPEG" && extension!="JFIF"){
                res.render('sell', {imagePrompt: "Invalid file type! Please choose an image."});
            }
    
            let r = (Math.random() + 1).toString(36).substring(2);
            
            postImg.mv(path.resolve('public/images/postimages',userName+"_"+r+"."+extension),function(err) {
                if(err){
                    console.log(err);
                }else{
                    console.log("Successful post image upload!");
                }
            });

            User.findOne({ userName: req.session.userName }, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else {// no result = some error 
                    const imgPath = '/images/postimages/'+userName+"_"+r+"."+extension;
                    const post = new Post({
                        postedBy: req.session.userName,
                        posterImg: docs.profileImg,
                        postImg: imgPath,
                        itemName: req.body.itemName,
                        postDetails: req.body.postDetails,
                        startingBid: req.body.startingBid,
                        buyOutPrice: req.body.buyOutPrice,
                        minimumIncrement: req.body.minimumIncrement,
                        endDate: req.body.endDate
                    });
                    post.save(function(err) {
                        if (err){
                            console.log(err);
                        } else{
                            res.redirect("/profile/" + req.session.userName);
                        }
                    });
                }
            });

        }
        else {
            res.render('login', {loginPrompt: "Please Login First"});
        }

    }
}

module.exports = sellcontroller;
