const {saveDetails} = require("../services/detailService")


module.exports.detail_post = async (req,res) => {
    const {id,gender,dateOfBirth,height,weight,activity,kcalUserBalance} = req.body;
    try{
        let Detaill = saveDetails(id,gender,dateOfBirth,height,weight,activity,kcalUserBalance);
        res.status(201).json({id: Detaill._id,});
    }catch (err){
        res.status(400).json();
    }
}
