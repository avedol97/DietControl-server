const {saveDetails, getDetails, updateDetails, updateAvatar} = require("../services/detailService")

module.exports.detail_post = async (req,res) => {
    const {id,gender,dateOfBirth,height,weight,activity,purpose, somatic} = req.body;
    const checkDetail = await getDetails(id);

    if(checkDetail == null){
        try{
            let detail = await saveDetails(id,gender,dateOfBirth,height,weight,activity,purpose, somatic);
            res.status(201).json(detail);
        }catch (err){
            res.status(400).json(err);
        }
    }else {{
        res.status(406).json({message:"Detail for this user is exists"})
    }}

}

module.exports.updateDetail_put = async (req,res) => {
    const {id, weight, activity, purpose} = req.body;
        try{
            let detailUpdate = await updateDetails(id, weight, activity, purpose);
            res.status(200).json(detailUpdate);
        }catch (err){
            res.status(400).json(err);
        }
}

module.exports.updateAvatar_put = async (req,res) => {
    const {id, avatar} = req.body;
    try{
        let detailUpdate = await updateAvatar(id, avatar);
        res.status(200).json(detailUpdate);
    }catch (err){
        res.status(400).json(err);
    }
}

module.exports.detail_get = async (req,res) => {
    const id = req.query.id;
    try {
        const detail = await getDetails(id);
        res.status(201).json(detail);
    } catch (err) {
        res.status(400).json(err);
    }


}
