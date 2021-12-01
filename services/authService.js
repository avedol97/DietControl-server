const Userl =require("../models/local/User")
const UsernameExists = require("../common/UsernameExists")
const cryptoPassword = require('../common/cryptoB.js');
const jwt = require('jsonwebtoken');
const UserPassword = require("../models/UserPassword");
const User = require("../models/User");
const WrongPasswordError = require("../common/WrongPasswordError");
const WrongEmailError = require("../common/WrongEmailError");
const bcrypt = require("bcrypt");

function checkEmailPromise(email){
    return new Promise( ((resolve, reject) => {
        User.findOne({email:email}, function(err,result) {
            if(err) reject(err);
            resolve(result);
        })
    }) );
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'secret', {
        expiresIn: maxAge
    });
}
const saveUser = async function(email,password){
    if(await checkEmailPromise(email)==null){
        const user = await User.create({
            email
        });
        let hashPassword = await cryptoPassword(password);
        let _id = user._id
        const userPassword = await UserPassword.create({
            _id, hashPassword
        })
        const token = createToken(user._id);
        return new Userl(user._id,email,hashPassword,token, maxAge)
    }else{
        throw new UsernameExists('Email is registered')
    }
}


const loginUser = async function(email, password) {
    const user = await checkEmailPromise(email);
    if(user==null){
        throw new WrongEmailError();
    }
    const passwordHash = await UserPassword.findById(user._id);
    const auth = await bcrypt.compare(password,passwordHash.hashPassword);
    if(auth) {
        const token = createToken(user._id)
        return new Userl(user._id,email,passwordHash,token, maxAge);
    }else{
        throw new WrongPasswordError();
    }
}

module.exports = {
    saveUser: saveUser,
    loginUser: loginUser
};
