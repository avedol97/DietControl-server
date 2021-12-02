const UserDetails = require("../models/UserDetails")
const Detail = require("../models/local/Detail")
const {estimateBmr} = require("../common/bmr")
const User = require("../models/User");
const ObjectId = require('mongodb').ObjectID;

const saveDetails = async function (id, gender, dateOfBirth, height, weight, activity, type) {
    let kcalUserBalance = estimateBmr(gender, dateOfBirth, height, weight, activity, type);
    console.log(kcalUserBalance)
    let _id = id;
    const userDetails = await UserDetails.create({
        _id, gender, dateOfBirth, height, weight, activity, type, kcalUserBalance
    });
    return new Detail(id, gender, dateOfBirth, height, weight, activity, type, kcalUserBalance);
}

const getDetails = async function (id) {
    return new Promise((resolve, reject) => {
        UserDetails.findById(ObjectId(id), function (err, result) {
            console.log(id)
            if (err) reject(err);
            resolve(result);
        })
    });
}

module.exports = {
    saveDetails: saveDetails,
    getDetails: getDetails,
};


