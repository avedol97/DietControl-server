const UserDetails = require("../models/UserDetails")
const Detail = require("../models/local/Detail")
const {estimateBmr} = require("../common/bmr")
const ObjectId = require('mongodb').ObjectID;

const saveDetails = async function (id, gender, dateOfBirth, height, weight, activity, purpose,somatic) {
    let kcalUserBalance = estimateBmr(gender, dateOfBirth, height, weight, activity,purpose);
    let _id = id;
    const userDetails = await UserDetails.create({
        _id, gender, dateOfBirth, height, weight, activity, purpose, somatic, kcalUserBalance
    });
    return new Detail(id, gender, dateOfBirth, height, weight, activity, purpose, somatic, kcalUserBalance);
}

const updateDetails = async function(id, weight, activity, purpose){
    const detail = await getDetails(id);
    let kcalUserBalance = estimateBmr(detail.gender, detail.dateOfBirth, detail.height, weight, activity,purpose);

    return await UserDetails.updateMany({
            "_id": id
        },
        {$set: {"weight": weight,"activity":activity, "purpose":purpose, "kcalUserBalance":kcalUserBalance}}
    ).then((obj) => {
        console.log('Updated - ' + obj);
    })
        .catch((err) => {
            console.log('Error: ' + err);
        })

}

const updateAvatar = async function(id, avatar){
    console.log(avatar)
    return await UserDetails.updateOne({
            "_id": id
        },
        {$set: {"avatar": avatar }}
    ).then((obj) => {
        console.log('Updated - ' + obj);
    })
        .catch((err) => {
            console.log('Error: ' + err);
        })

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
    updateDetails:updateDetails,
    updateAvatar: updateAvatar,
};


