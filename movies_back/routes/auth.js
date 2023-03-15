const router = require("express").Router();
const User = require("../models/User");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//Register

router.post("/register", async (req, res) =>{
    console.log("in register function!");
    const user = await User.findOne({email: req.body.email});
        if(user){
            res.status(401).json("Email address allready in use.");
            return;
        }
    //Creating new user from the request body inforamtion + enrypting password to store in db.
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: cryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString(),
    });
    console.log(newUser);
    // Add the new user to my db
    try{
        const user =  await newUser.save();
        // status 201 - Created and return User info 
        res.status(201).json(user);
    } catch(err){
        // status 500 - internal server error, return error info
        res.status(500).json(err);
    }
});


//Login

router.post("/login", async (req, res) => {
    try{
        // see if there is user with this email if not return 401 (un-auth), and a message
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(401).json("No user with this Email, please check your Email address");
            return;
        }

        //decode the password to check if macth with what the user provided
        const bytes = cryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const decodedPassword = bytes.toString(cryptoJS.enc.Utf8);

        if(decodedPassword !== req.body.password){
            res.status(401).json("Wrong password."); // 401- un-auth + message
        }

        //Creating json web token when user is loged in
        const accessToken = jwt.sign(
            {id: user._id, email: user.email},
            process.env.SECRET_KEY,
            {expiresIn: '5d'}
        );

        //remove the password from the info im about to return
         const { password, ...info } = user._doc;

        // return user info (without password) and code 200 (ok)
        res.status(200).json({...info,accessToken});
    } catch(err){
        console.log("in error section");
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;