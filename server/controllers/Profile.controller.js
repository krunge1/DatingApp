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
                        Profile.create({...req.body, user: _id, name: userData.name})
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
    //Read (Find One By Profile Id)
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
                //Find All Friends by Profile data is available in this oneProfile object. Access friends by oneProfile.friend._id
            })
            .catch((err) =>{
                res.status(500).json({message: 'Something went wrong', error: err})
            })
        }catch (err){
            res.status(400).json({error: err})
        }
    },
    //Read (Find One By User Id)
    findProfileByUserId: (req, res) => {
        try{
            const {userToken} = req.cookies;
            //Verify if Logged In
            if(!userToken){
                return res.status(400).json({message: "User must be logged in"});
            }
            const userData = jwt.verify(userToken, secret)
            const loggedInUserId = userData._id
            //Verify Token and get userID
            Profile.findOne({user: loggedInUserId})
            // console.log(userProfile)
            .then((userProfile) => {
                res.json(userProfile, )
            })
            .catch((err) => {
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
    //Add Friend to Profile Model
    addFriend: async (req, res) => {
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
            // console.log(profile._id)
            if (!profile) {
                return res.status(400).json({ message: 'Profile not found' });
            }
            if(profile.user.toString() !== loggedInUserId){
                return res.status(400).json({message: "User does not own profile."})
            }
            // Check if the friendId already exists in the friends array
            friendId = req.params.friendId
            // console.log(friendId)
            const existingFriend = profile.friend.find((friend) => friend.toString() === friendId);
            if (existingFriend) {
                return res.status(400).json({message: 'Friend already added'});
            }
            profile.friend.push(friendId);
            await profile.save();
            res.json(profile);
        }catch (err){
            res.status(400).json({error: err})
        }
    },
       //Add Blind Date to Profile Model
    addBlindDate: async (req, res) => {
        try{
            const {userToken} = req.cookies;
            //Verify if logged in
            if(!userToken){
                return res.status(400).json({message: "User must be logged in"});
            }
            //Verify Token and get userID
            const userData = await jwt.verify(userToken, secret);
            const loggedInUserId = userData._id;
            const blindDateProfile = await Profile.findById(req.params.blindDateId);
            const userProfile = await Profile.findOne({user: loggedInUserId})
            const blindDateId = req.params.blindDateId;
            console.log(userProfile._id)
            // Find the profile by ID and check if the logged-in user DOES NOT owns it
            const friendProfile = await Profile.findById(req.params.friendId);
            if (!friendProfile) {
                return res.status(400).json({ message: 'Profile not found' });
            }
            //Verify if user is attempting to add blind date to own profile
            if(friendProfile.user.toString() === loggedInUserId){
                return res.status(400).json({message: "Cannot add own profile to a date."})
            }
            // Check if the blindDateId already exists in the Blind Date array
            const blindDate = friendProfile.blindDate.find((blindDate) => blindDate.toString() === blindDateProfile._id);
            if(blindDate){
                return res.status(400).json({message: 'Blind Date already added'});
            };
            // Check to see if the User is actually friends with the Friend profile getting blind date add and the Blind Date Profile
            const isFriendWithFriendProfile = userProfile.friend.includes(friendProfile._id.toString());
            const isFriendWithBlindDateProfile = userProfile.friend.includes(blindDateProfile._id.toString());
            if (!isFriendWithFriendProfile || !isFriendWithBlindDateProfile) {
                return res.status(400).json({ message: 'You must be friends with both profiles to add a blind date' });
            };
            friendProfile.blindDate.push(blindDateId);
            await friendProfile.save();
            res.json(friendProfile);
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
            const uploadedFiles = req.uploadedFiles;
            profile.pictures.push(...uploadedFiles);
            await profile.save();
            res.json(profile);
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
    },
    //Remove Friend from Profile
    removeFriend: async (req, res) => {
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
            // console.log(profile._id)
            if (!profile) {
                return res.status(400).json({ message: 'Profile not found' });
            }
            if(profile.user.toString() !== loggedInUserId){
                return res.status(400).json({message: "User does not own profile."})
            }
            // Check if the friendId already exists in the friends array
            friendId = req.params.friendId
            const existingFriendIndex = profile.friend.findIndex((friend) => friend.toString() === friendId);
            // console.log(existingFriendIndex)
            if (existingFriendIndex === -1) {
                return res.status(400).json({message: 'Friend not found'});
            }
            profile.friend.splice(existingFriendIndex, 1);
            await profile.save();
            res.json(profile);
        }catch (err){
            res.status(400).json({error: err})
        }
    },
    removeBlindDate: async (req, res) => {
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
            // console.log(profile._id)
            if (!profile) {
                return res.status(400).json({ message: 'Profile not found' });
            }
            if(profile.user.toString() !== loggedInUserId){
                return res.status(400).json({message: "User does not own profile."})
            }
            // Check if the blindDateId already exists in the Blind Date array
            blindDateId = req.params.blindDateId
            const existingBlindDateIndex = profile.blindDate.findIndex((blindDate) => blindDate.toString() === blindDateId);
            // console.log(existingBlindDateIndex)
            if (existingBlindDateIndex === -1) {
                return res.status(400).json({message: 'Blind Date not found'});
            }
            profile.blindDate.splice(existingBlindDateIndex, 1);
            await profile.save();
            res.json(profile);
        }catch (err){
            res.status(400).json({error: err})
        }
    },
    removePhoto: async (req, res) => {
        try {
            const { userToken } = req.cookies;
            // Verify if logged in
            if (!userToken) {
            return res.status(400).json({ message: 'User must be logged in' });
            }
            // Verify Token and get userID
            const userData = await jwt.verify(userToken, secret);
            const loggedInUserId = userData._id;
            // Find the profile by ID and check if the logged-in user owns it
            const profile = await Profile.findById(req.params.id);
            if (!profile) {
            return res.status(400).json({ message: 'Profile not found' });
            }
            if (profile.user.toString() !== loggedInUserId) {
            return res.status(400).json({ message: 'User does not own profile.' });
            }
            // Check if the photo exists in the pictures array
            const filename = req.params.filename;
            console.log(filename)

            // Check if the photo with the given filename exists in the pictures array
            const index = profile.pictures.indexOf(filename);
            if (index !== -1) {
              // Remove the photo from the pictures array
            profile.pictures.splice(index, 1);
            // Save the updated profile
            await profile.save();
            return res.json(profile);
        } else {
            // If the photo with the given filename is not found in the pictures array
            return res.status(400).json({ message: "Photo not found in profile" });
        }
        } catch (err) {
        res.status(400).json({ error: err });
        }
    },
}