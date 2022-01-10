const {saveBalance,getAllBalanceByIdUser, getBalanceByData} = require("../services/balanceService");

module.exports.balance_create_post = async (req,res) => {
    const {idUser, idProduct, date, protein, fat, carbohydrates, kcalToday, weight} = req.body;
    try{
        let balanceDay = await saveBalance(idUser, idProduct, date, protein, fat, carbohydrates, kcalToday, weight);
        res.status(201).json(balanceDay);
    }catch (err){
        res.status(400).json(err);
    }
}

module.exports.balance_getAll = async (req,res) => {
    const id = req.query.id;
    try {
        const balanceDay = await getAllBalanceByIdUser(id);
        res.status(201).json(balanceDay);
    } catch (err) {
        res.status(400).json(err);
    }

}
