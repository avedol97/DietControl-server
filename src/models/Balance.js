const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
    idUser: {
        type: Object,
        required: [true, 'Please enter a name'],
    },
    idProduct:{
        type: Object,
    },
    date: {
        type: Date,
        required: [true, 'Please enter a name'],
        default: Date.now
    },
    protein: {
        type: Number,
        required: [true, 'Please enter protein'],
    },
    fat: {
        type: Number,
        required: [true, 'Please enter the fat'],
    },
    carbohydrates: {
        type: Number,
        required: [true, 'Please enter the carbohydrates'],
    },
    kcalToday: {
        type: Number,
        required: [true, 'Please enter the calories'],
    },
})

