const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    userID: {
        type: String,
        unique: true,
    },
    gender: {
        type: String,
        default: "None"
    },
    dateOfBirth: {
        type: Date,
        default: Date.parse("01.01.1921")
    },
    height: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    activity: {
        type: Number,
        default: 0
    },
    kcalMid: {
        type: Number,
        default: 0
    }
})


const UserDetails = mongoose.model('user', userDetailsSchema)

module.exports = UserDetails;
