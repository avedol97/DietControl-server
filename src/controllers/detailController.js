const {saveDetails, getDetails} = require("../services/detailService")

module.exports.detail_post = async (req,res) => {
    const {id,gender,date,height,weight,activity,type, somatotyp} = req.body;
    const checkDetail = await getDetails(id);

    if(checkDetail == null){
        try{
            let detail = await saveDetails(id,gender,date,height,weight,activity,type, somatotyp);
            res.status(201).json(detail);
        }catch (err){
            res.status(400).json();
        }
    }else {{
        res.status(406).json({message:"Detail for this user is exists"})
    }}

}

module.exports.detail_get = async (req,res) => {
    const {id} = req.body;
    try {
        const detail = await getDetails(id);
        res.status(201).json(detail);
    } catch (err) {
        res.status(400).json(err);
    }
}
