const Joi = require('joi');
const UsernameExists = require('../common/UsernameExists');
const WrongEmailError = require("../common/WrongEmailError");
const WrongPasswordError = require("../common/WrongPasswordError");
const {loginUser, saveUser, getUser,updateDetailUser, updateAdminUser, updateActiveUser} = require("../services/userService");

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
        res.status(400).json("Problem");
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;

    try {
        let userL = await loginUser(email,password);
        res.cookie('jwt', userL._token, {httpOnly: true, maxAge: userL._maxAge * 1000})
        res.status(201).json({user: userL._id, token: userL._token,isDetails: userL.isDetails, isAdmin: userL.isAdmin, email: userL.email});
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
        res.status(400).json({message: "Wrong"});
    }
}

module.exports.userUpdateDetail_put = async (req, res) => {
    const {id} = req.body;

    try {
        await updateDetailUser(id);
        const user = await getUser(id);
        res.status(201).json(user);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
}

module.exports.userUpdateAdmin_put = async (req, res) => {
    const {id} = req.body;

    try {
        await updateAdminUser(id);
        const user = await getUser(id);
        res.status(201).json(user);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
}

module.exports.userUpdateActive_put = async (req, res) => {
    const {id} = req.body;

    try {
        await updateActiveUser(id);
        const user = await getUser(id);
        res.status(201).json(user);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
}


module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    console.info(`Successfully logged out!`)
    res.status(204).json();
}
