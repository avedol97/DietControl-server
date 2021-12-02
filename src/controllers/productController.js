const {saveProduct, getProduct,deleteProduct, getAllProduct} = require("../services/productService");


module.exports.product_post = async (req,res) => {
    const {name, category, protein, fat, carbohydrates, calories} = req.body;
    try{
        let product = await saveProduct(name, category, protein, fat, carbohydrates, calories);
        res.status(201).json(product);
    }catch (err){
        res.status(400).json();
    }
}

module.exports.product_get_byName = async (req,res) => {
    const {name} = req.body;
    try {
        const product = await getProduct(name);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports.product_get_all = async (req,res) => {
    try {
        const product = await getAllProduct();
        console.log("tu")
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