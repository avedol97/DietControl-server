const {saveDetails} = require("../services/detailService")



module.exports.detail_post = async (req,res) => {
    const {id,gender,date,height,weight,activity,type} = req.body;
    try{

        let Detail = saveDetails(id,gender,date,height,weight,activity,type);
        res.status(201).json({id: Detail._id,});
    }catch (err){
        console.log(err)
        res.status(400).json();
    }
}
