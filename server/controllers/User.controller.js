const User = require('../models/User.model');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

module.exports = {
    //CRUD ITEMS
    //create
    registerUser: async (req, res) => {
        try{
            //check if the email that was entered in the reg form is already in the db
            const potentialUser = await User.findOne({email: req.body.email})
            if(potentialUser){
                res.status(400).json({message: "That email already exists, please login."})
            }else{
                //create user
                const newUser = await User.create(req.body);
                //generating a usertoken and storing the id and email of the new user
                const userToken = jwt.sign({_id: newUser._id, email: newUser.email}, secret, {expiresIn: '2h'})
                // console.log(userToken);
                res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 2 * 60 * 60 * 1000}).json(newUser);
        }
    }
        catch(err){
            res.status(400).json({error: err})
        }
    },

    loginUser: async (req, res) => {
        try{
            //check if the user already exists
            const user = await User.findOne({email: req.body.email})
            if(user){
                //check to see if the password entered matches the password in the DB for the email
                const passwordMatch = await bcrypt.compare(req.body.password, user.password)
                if(passwordMatch){
                    // generate userToken
                    const userToken = jwt.sign({_id: user._id, email: user.email}, secret, {expiresIn: '2h'})
                    //Log in the user
                    res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 2 * 60 * 60 * 1000}).json(user);
                }
                else{
                    // if the email does exist but password doesnt match
                    res.status(400).json({message: 'Invalid email/password'})
                }
            }
            // if the user doesnt exist
            else{
                res.status(400).json({message: 'Invalid email/password'})
            }
        }
        catch(err){
            res.status(400).json({error: err})
        }
    },
    logout: (req,res) => {
        res.clearCookie('userToken').json({message: "You are now logged out."})
    }
}