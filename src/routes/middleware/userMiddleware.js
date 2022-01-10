const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require("../../../config");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, config.JwtSecret, (err, decodedToken) => {
            if (err) {

                console.log(err.message);
                res.status(401).json({message:"No Auth"});
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.status(401).json({message:"No Auth"});
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, config.JwtSecret, async (err, decodedToken) => {
                if (err) {
                    console.log(err.message);
                    res.locals.user = null;
                    next();
                } else {
                    console.log(decodedToken);
                    res.locals.user = await User.findById(decodedToken.id);
                    next();
                }
            }
        )
    } else {
        res.locals.user = null;
        next();
    }


}

module.exports = {requireAuth,checkUser};
