const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: { 
        type: String,
    },
    zipCode: {
        type: String,
        required: [true, 'Zip Code is required'],
    },
    aboutMe: {
        type: String,
        required: [true, 'About Me is required'],
        minLength: [5, 'About me must be at least 5 characters long']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required.']
    },
    sexualOrientation: {
        type: String,
        required: [true, 'Sexual orientation is required.']
    },
    pictures: {
        type: [String],
        minLength: [1, 'You must upload at least one profile picture.']
    },
    interests: {
        type: [String]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    friend: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Profile"
    }]
}, {timestamps: true});

module.exports = mongoose.model('Profile', ProfileSchema);
