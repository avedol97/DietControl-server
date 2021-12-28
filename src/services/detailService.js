const UserDetails = require("../models/UserDetails")
const Detail = require("../models/local/Detail")
const {estimateBmr} = require("../common/bmr")
const ObjectId = require('mongodb').ObjectID;

const saveDetails = async function (id, gender, dateOfBirth, height, weight, activity, type,somatotyp) {
    let kcalUserBalance = estimateBmr(gender, dateOfBirth, height, weight, activity, type, somatotyp);
    let _id = id;
    const userDetails = await UserDetails.create({
        _id, gender, dateOfBirth, height, weight, activity, type, somatotyp, kcalUserBalance
    });
    return new Detail(id, gender, dateOfBirth, height, weight, activity, type, somatotyp, kcalUserBalance);
}

const getDetails = async function (id) {
    return new Promise((resolve, reject) => {
        UserDetails.findById(ObjectId(id), function (err, result) {
            if (err) reject(err);
            resolve(result);
        })
    });
}

module.exports = {
    saveDetails: saveDetails,
    getDetails: getDetails,
};


