const Joi = require('joi');
const UsernameExists = require('../common/UsernameExists');
const WrongEmailError = require("../common/WrongEmailError");
const WrongPasswordError = require("../common/WrongPasswordError");
const {loginUser, saveUser} = require("../services/userService");


const handleErrors = (err) => {

    let errors = {email: '', password: ' '};

    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered'
    }

    if(err.message === 'incorrect password'){
        errors.password = 'that password is incorrect'
    }

    if (err.code === 11000) {
        errors.email = 'that email is registered';
        return errors;
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
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
            res.status(400).json({message: "Problem with validation"});
            return;
        }
        let userLocal = await saveUser(email,password)
        console.info(`User is created! email: ${userLocal.email}`);
        res.cookie('jwt', userLocal._token, {httpOnly: true, maxAge: userLocal._maxAge * 1000})
        res.status(201).json({user: userLocal._id});
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
        res.cookie('jwt', userL._token, {httpOnly: true, maxAge: userL._maxAge * 1000})
        res.status(201).json({user: userL._id, token: userL._token});
        console.info(`Successfully logged in! email: ${userL.email}`);
    } catch (err) {
        if( err instanceof WrongEmailError) {
            res.status(400).json({message: "Email not exists!"});
            return;
        }else if(err instanceof WrongPasswordError) {
            res.status(407).json({message: "Wrong Password!"});
            return;
        }
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({message: "Wrong"});
    }

}


module.exports.userDeactivation_post = (req, res)=>{

}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    console.info(`Successfully logged out!`)
    res.status(204).json();
}
