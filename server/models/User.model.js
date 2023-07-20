const mongoose = require('mongoose');
const bcry0pt = require('bcrypt');
import {isEmail} from ('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, "Name must be at least 3 characters long."]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [isEmail, 'Invalid Email']

    },
    birthdate:{
        type: Date,
        required: [true, 'Date of Birth is required'],
        validate: {
            validator: function(v) {
                v.setFullYear(v.getFullYear()+18)
                const currentTime = new Date();
                currentTime.setHours(0,0,0,0);
                return v.getTime() <= currentTime.getTime();
                },
                message: props => 'You must be 18 years old.'
            },
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters.']
    }
}, {timestamps: true});

//Middleware
UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(value => this.confirmPassword = value)

UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords do not match.')
    }
    next();
})

UserSchema.pre('save', function (next){
    bcry0pt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', UserSchema);