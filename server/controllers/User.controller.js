const User = require('../models/User.model');
const secretKey = process.env.SECRET_KEY;
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
                res.status(400).josn({message: "That email already exists, please login."})
            }else{
                //create user
                const newUser = await User.create(req.body);
                res.status(201).json(newUser);
        }
    }
        catch(err){
            res.status(400).json({error: err})
        }
    }

}