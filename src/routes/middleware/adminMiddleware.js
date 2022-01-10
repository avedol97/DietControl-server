const jwt = require('jsonwebtoken');
const config = require("../../../config");


const admin = (req, res, next) => {

    const token = req.cookies.jwt;

    try {
        req.user = jwt.verify(token, config.JwtSecret);
        if (req.user.isAdmin) {
            next();
        }

    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = {admin};
