const Product = require("../models/Product")
const ProductLocal = require("../models/local/Product");

const getProduct = async function (name) {
    return new Promise((resolve, reject) => {
        Product.find({name: name}, function (err, result) {
            if (err) reject(err);
            resolve(result);
        })
    });
}

const getAllProduct = async function () {
    return new Promise((resolve, reject) => {
        Product.find({}, function (err, result) {
            if (err) reject(err);
            resolve(result);
        })
    });
}

const saveProduct = async function (name, category, protein, fat, carbohydrates, calories) {
    const checkProduct =  await getProduct(name);
    if(checkProduct.isEmpty){
        const product = await Product.create({
            name, category, protein, fat, carbohydrates, calories
        });
        return new ProductLocal(name, category, protein, fat, carbohydrates, calories);
    }else {
        console.log("Product is exist")
    }

}


const deleteProduct = async function (name) {
    return Product.deleteOne({name: name})
    };


module.exports = {
    saveProduct: saveProduct,
    getProduct: getProduct,
    deleteProduct: deleteProduct,
    getAllProduct: getAllProduct
};


