const UserDetails = require("../models/UserDetails")
const Detail = require("../models/local/Detail")
const { estimateBmr } = require("../common/bmr")

const saveDetails = async function(id,gender,dateOfBirth,height,weight,activity,type) {
    let kcalUserBalance = estimateBmr(gender,dateOfBirth,height,weight,activity,type);
    console.log(kcalUserBalance)
    let _id = id;
    const userDetails = await UserDetails.create({
        _id, gender,dateOfBirth,height,weight,activity,type,kcalUserBalance
    });
    return new Detail(id, gender,dateOfBirth,height,weight,activity,type,kcalUserBalance);
}

module.exports = {
    saveDetails: saveDetails,
};
