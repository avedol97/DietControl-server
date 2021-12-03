const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
    idUser: {
        type: String,
        required: true,
    },
    idProduct: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now
    },
    protein: {
        type: Number,
    },
    fat: {
        type: Number,
    },
    carbohydrates: {
        type: Number,
    },
    kcalToday: {
        type: Number,
    },
})

const BalanceDay = mongoose.model('balance', balanceSchema)

module.exports = BalanceDay;
