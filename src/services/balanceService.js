const BalanceDay = require("../models/BalanceDay")
const BalanceLocal = require("../models/local/BalanceDay");
const {getAllProduct} = require("../services/productService");
const Product = require("../models/Product");
const ObjectId = require('mongodb').ObjectID;

const saveBalance = async function (idUser, idProduct, date, protein, fat, carbohydrates, kcalToday) {
    const balanceDay = await BalanceDay.create({
        idUser, idProduct, date, protein, fat, carbohydrates, kcalToday
    });
    return new BalanceLocal(idUser, idProduct, date, protein, fat, carbohydrates, kcalToday);
}

const getAllBalanceByIdUser = async function () {
    return new Promise((resolve, reject) => {
        Product.find({}, function (err, result) {
            if (err) reject(err);
            resolve(result);
        })
    });
}


module.exports = {
    saveBalance: saveBalance,
    getAllBalanceByIdUser:getAllBalanceByIdUser,
};

