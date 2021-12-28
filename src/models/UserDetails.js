const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    gender: {
        type: String,
        default: "None"
    },
    dateOfBirth: {
        type: Object
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
    type: {
        type: Number,
        default: "None"
    },
    somatotyp: {
        type: String,
        default: "None"
    },
    kcalUserBalance: {
        type: Number,
        default: 0
    }
})


const UserDetails = mongoose.model('detail', userDetailsSchema)

module.exports = UserDetails;
