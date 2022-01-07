const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
    idUser: {
        type: String,
        required: true,
    },
    idProduct: {
        type: Object,
    },
    data: {
        type: Object,
        required: true,
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
    weight: {
        type: Number,
        default: 0
    },
})

const BalanceDay = mongoose.model('balance', balanceSchema)

module.exports = BalanceDay;
