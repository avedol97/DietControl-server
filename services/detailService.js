const UserDetails = require("../models/UserDetails")
const Detaill = require("../models/local/Detaill")

const saveDetails = async function(id,gender,dateOfBirth,height,weight,activity) {

    let _id = id;
    const userDetails = await UserDetails.create({
        _id, gender,dateOfBirth,height,weight,activity
    })
    return new Detaill(id, gender,dateOfBirth,height,weight,activity);
}

module.exports = {
    saveDetails: saveDetails,
};
