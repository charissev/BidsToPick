const User = require('../model/usersSchema.js');

const logincontroller = {
    // for redirecting login and signup
    getLogin: function(req, res) {
        res.render('login', {
            loginPrompt: ""
        });
    },

    // for redirecting to home page
    checkLogin: function(req, res) {
        User.findOne({email: req.body.email, password: req.body.password }, function (err, docs) {
            if (err){
                console.log(err)
            }
            // if docs has no result = wrong login
            else if (docs == null){ 
                res.render('login', {loginPrompt: "Wrong username/password"})
                console.log("No Result");
            } 
            else{
                console.log("Logged in successfully.");
                req.session.isAuth = true;
                req.session.userName = docs.userName;
                req.session.id = docs.id;
                req.session.dp = docs.profileImg;
                res.redirect('/home');
                console.log(req.session.userName);
            }
        });
    },

    getRegister: function(req, res) {
        res.render('signup', {
            registerPrompt: ""
        });
    },
    
    saveRegister: function(req, res) {        
        const fname = req.body.fname;
        const lname = req.body.lname;
        const idNum = req.body.idNum;
        const username = req.body.username;
        const email = req.body.email;
        const pw1 = req.body.pw1;
        const pw2 = req.body.pw2;
        
        if (pw1 != pw2){
            res.render('signup', {registerPrompt: "Please match the passwords"});
        }
        else {
            const user = new User({
                firstName: fname,
                lastName: lname,
                idNum: idNum,
                userName:username,
                email: email,
                password: pw1
            });
            user.save(function(err) {
                if (err){
                    console.log(err);
                } else{
                    res.render('login', {loginPrompt: "You have registered successfully!"});
                }
            });
        }
    },
    
    getLogout: function(req, res) {
        req.session.destroy();
        res.render('login', {
            loginPrompt: ""
        });
    }    
}

module.exports = logincontroller;