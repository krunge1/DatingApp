const Profile = require('../models/Profile.model')
const User = require('../models/User.model')
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const cookieParser = require("cookie-parser");

module.exports = {

//CRUD ITEMS
    //Create
    createProfile: async (req, res) => {
        try{
            //Test if user is logged in first, then allow for profile created.
            const {userToken} = req.cookies;
            if(userToken) {
                const userData = await jwt.verify(userToken, secret);
                const { _id } = await User.findById(userData._id);
                jwt.verify(userToken, secret, {}, async(err) => {
                    if(err) {
                        res.json({message: 'User Login Error', error: err});
                    }
                    else{
                        Profile.create({...req.body, user: _id})
                        .then((newProfile) => {
                            res.json(newProfile)
                        })
                        .catch((err) => {
                            res.status(500).json({message: 'Something went wrong', error: err})
                        })
                    }
                })
            }
            else{
                res.status(400).json({message: 'User must be logged in'})
            }
        }        
        catch(err){
            res.status(400).json({error: err})
        }
    },
    //Read (Find All)
    findAllProfiles: (req, res) => {
        try{
            const {userToken} = req.cookies;
            //Verify if logged in
            if(!userToken){
                return res.status(400).json({message: "User must be logged in"});
            }
        Profile.find({})
        .then((allProfiles) => {
            res.json(allProfiles)
        })
        .catch((err) => {
            res.status(500).json({message: 'Something went wrong', error: err})
        })
        }catch (err){
            res.status(400).json({error: err})
        }
    },
    //Read (Find One By User Id)
    findProfileById: (req, res) => {
        try{
            const {userToken} = req.cookies;
            //Verify if logged in
            if(!userToken){
                return res.status(400).json({message: "User must be logged in"});
            }
            Profile.findOne({_id: req.params.id})
            .then((oneProfile) =>{
                res.json(oneProfile)
            })
            .catch((err) =>{
                res.status(500).json({message: 'Something went wrong', error: err})
            })
        }catch (err){
            res.status(400).json({error: err})
        }
    },
    //Update
    updateProfile: async (req, res) => {
        try{
            const {userToken} = req.cookies;
            //Verify if logged in
            if(!userToken){
                return res.status(400).json({message: "User must be logged in"});
            }
            //Verify Token and get userID
            const userData = await jwt.verify(userToken, secret);
            const loggedInUserId = userData._id;
            // Find the profile by ID and check if the logged-in user owns it
            const profile = await Profile.findById(req.params.id);
            if (!profile) {
                return res.status(400).json({ message: 'Profile not found' });
            }
            if(profile.user.toString() !== loggedInUserId){
                return res.status(400).json({message: "User does not own profile."})
            }
            //if user owns, make update
            Profile.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
            .then((updateProfile) => {
                res.json(updateProfile)
            })
            .catch((err) =>{
                res.status(500).json({message: 'Something went wrong', error: err})
            });
        }catch (err){
            res.status(400).json({error: err})
        }
    },

    //Delete
    deleteProfile: async (req, res) => {
        try{
            const {userToken} = req.cookies;
            //Verify if user is logged in.
            if(!userToken){
                return res.status(400).json({message: "User mnust be logged in"});
            }
            //Verify Token and get userID
            const userData = await jwt.verify(userToken, secret);
            const loggedInUserId = userData._id;
            // Find the profile by ID and check if the logged-in user owns it
            const profile = await Profile.findById(req.params.id);
            if (!profile) {
                return res.status(400).json({ message: 'Profile not found' });
            }
            if(profile.user.toString() !== loggedInUserId){
                return res.status(400).json({message: "User does not own profile."})
            }
            //if user owns, delete
            Profile.deleteOne({_id: req.params.id})
            .then((deleteProfile) => {
                res.json(deleteProfile)
            })
        }catch (err){
            res.status(400).json({error: err})
        }
    }


}