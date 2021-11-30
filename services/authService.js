const Userl =require("../models/local/Userl")
const UsernameExists = require("../common/UsernameExists")
const cryptoPassword = require('../common/cryptoB.js');
const jwt = require('jsonwebtoken');
const UserPassword = require("../models/UserPassword");
const User = require("../models/User");
const WrongPasswordError = require("../common/WrongPasswordError");
const WrongEmailError = require("../common/WrongEmailError");
const bcrypt = require("bcrypt");

function checkEmail(email){
    let result = User.findOne({email: email});
    return result.error() !== undefined
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'secret', {
        expiresIn: maxAge
    });
}
const saveUser = async function(email,password){
    if(!checkEmail(email)){
        const user = await User.create({
            email
        });
        let hashPassword = await cryptoPassword(password);
        console.log(user);
        let _id = user._id
        console.log(hashPassword)
        console.log(typeof hashPassword)
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
    if(!checkEmail(email)){
        console.log("if");
        throw new WrongEmailError();
    }
    const user = await User.findOne({email:email});
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
