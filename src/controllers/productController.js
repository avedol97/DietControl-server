const {saveProduct, getProduct,deleteProduct, getAllProduct} = require("../services/productService");


module.exports.product_create_post = async (req,res) => {
    const {idUser,name, category, protein, fat, carbohydrates, calories, packaging} = req.body;
    const checkProduct = await getProduct(name);
    if(checkProduct.length ===0){
        try{
            let product = await saveProduct(idUser,name, category, protein, fat, carbohydrates, calories, packaging);
            res.status(201).json(product);
        }catch (err){
            res.status(400).json();
        }
    }else {
        res.status(406).json({message:"This Product is Exists"})
    }


}

module.exports.product_getByName= async (req,res) => {
    const {name} = req.body;
    try {
        const product = await getProduct(name);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports.product_getAll = async (req,res) => {
    try {
        const product = await getAllProduct();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports.product_delete = async (req,res) => {
    const {name} = req.body;
    try {
        await deleteProduct(name);
        res.status(204);
    } catch (err) {
        res.status(400).json(err);
    }
}
