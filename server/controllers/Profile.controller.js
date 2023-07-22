const Profile = require('../models/Profile.model')
const User = require('../models/User.model')
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

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

    
    // "photos" need to match with data.set("photos", files); in uploadPhoto() in MyTrail.jsx
    // 100 is the limit (can be any other number)
    uploadPhoto: async (req, res) => {
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
            const photoMidWare = multer({ dest: "uploads/" });
            photoMidWare.array("photos", 100)
            const uploadedFiles = [];
            console.log(req.files);

            for (let i = 0; i < req.files.length; i++) {
                // console.log(req.files[i].mimetype.split("/")[0]);
                if (req.files[i].mimetype.split("/")[0] === "image") {
                    const { path, originalname } = req.files[i];
                    const parts = originalname.split(".");
                    const extension = parts[parts.length - 1];
                    const newPath = `${path}.${extension}`;
                    console.log(path + " " + newPath);
                    fs.renameSync(path, newPath);
                    console.log(newPath);
                    uploadedFiles.push(newPath.replace("uploads/", "")); // ! NOTE
                } else {
                    res.status(400).json({ message: "File type not compatible" });
                }
            }
            res.json(uploadedFiles);
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