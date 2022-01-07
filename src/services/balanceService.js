const BalanceDay = require("../models/BalanceDay")
const BalanceLocal = require("../models/local/BalanceDay");
const ObjectId = require('mongodb').ObjectID;

const saveBalance = async function (idUser, idProduct, date, protein, fat, carbohydrates, kcalToday,weight) {
    const balanceDay = await BalanceDay.create({
        idUser, idProduct, date, protein, fat, carbohydrates, kcalToday,weight
    });
    return new BalanceLocal(idUser, idProduct, date, protein, fat, carbohydrates, kcalToday,weight);
}

const getAllBalanceByIdUser = async function (id) {
    return new Promise((resolve, reject) => {
        BalanceDay.find({idUser: id}, function (err, result) {
            if (err) reject(err);
            resolve(result);
        })
    });
}

module.exports = {
    saveBalance: saveBalance,
    getAllBalanceByIdUser:getAllBalanceByIdUser,
};

