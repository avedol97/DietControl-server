const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDetails:{
        type: Boolean,
        default: false
    },
    isActive:{
        type:Boolean,
        default: true,
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User;
