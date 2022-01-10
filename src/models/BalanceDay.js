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
        type: Object,
        required: true,
    },
    protein: {
        type: Number,
        default: 0,
    },
    fat: {
        type: Number,
        default: 0,
    },
    carbohydrates: {
        type: Number,
        default: 0,
    },
    kcalToday: {
        type: Number,
        default: 0,
    },
    weight: {
        type: Number,
        default: 0
    },
})

const BalanceDay = mongoose.model('balance', balanceSchema)

module.exports = BalanceDay;
