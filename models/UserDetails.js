const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
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
    kcalUserBalance: {
        type: Number,
        default: 0
    }
})


const UserDetails = mongoose.model('detail', userDetailsSchema)

module.exports = UserDetails;
