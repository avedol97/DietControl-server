const {saveBalance,getAllBalanceByIdUser} = require("../services/balanceService");

module.exports.balance_create_post = async (req,res) => {
    const {idUser, idProduct, date, protein, fat, carbohydrates, kcalToday} = req.body;
    try{
        let balanceDay = await saveBalance(idUser, idProduct, date, protein, fat, carbohydrates, kcalToday);
        res.status(201).json(balanceDay);
    }catch (err){
        res.status(400).json();
    }
}

module.exports.balance_getAll = async (req,res) => {
    try {
        const balanceDay = await getAllBalanceByIdUser();
        res.status(201).json(balanceDay);
    } catch (err) {
        res.status(400).json(err);
    }
}