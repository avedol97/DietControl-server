const User = require('../models/User');
const UserPassword = require('../models/UserPassword');
const bcrypt = require("bcrypt");
const Joi = require('joi');
const UsernameExists = require('../common/UsernameExists');
const WrongEmailError = require("../common/WrongEmailError");
const WrongPasswordError = require("../common/WrongPasswordError");
const {loginUser, saveUser} = require("../services/authService");


const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', password: ' '};

    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered'
    }

    if(err.message === 'incorrect password'){
        errors.password = 'that password is incorrect'
    }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'that email is registered';
        return errors;
    }

    //validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}


module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.detail_get = async (req, res) => {
    const email = req.body;
    try {
        const user = await User.findOne(email).select("-password")
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;
    try {

        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(30).required()
        });
        let x = schema.validate(req.body);
        if(x.error!==undefined){
            res.status(400).json({message:"haslo"});
            return;
        }
        let userL = await saveUser(email,password)

        res.cookie('jwt', userL._token, {httpOnly: true, maxAge: userL._maxAge * 1000})
        res.status(201).json({user: userL._id});
    } catch (err) {
        if( err instanceof UsernameExists){
            res.status(400).json({message:"email jest juz zajety"});
            return;
        }
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }

}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    try {

        let userL = await loginUser(email,password);
        console.log(userL);
        res.cookie('jwt', userL._token, {httpOnly: true, maxAge: userL._maxAge * 1000})
        res.status(201).json({user: userL._id});
    } catch (err) {
        if( err instanceof WrongEmailError){

        }else if(err instanceof WrongPasswordError){

        }
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }

}


module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}
