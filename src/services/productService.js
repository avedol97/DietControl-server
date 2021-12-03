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

const saveProduct = async function (idUser,name, category, protein, fat, carbohydrates, calories) {
        const product = await Product.create({
            idUser, name, category, protein, fat, carbohydrates, calories
        });
        return new ProductLocal(idUser,name, category, protein, fat, carbohydrates, calories);
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


