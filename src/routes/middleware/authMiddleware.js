const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log("reuqire Auth");
    if (token) {
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err) {
                //bledny token
                console.log(err.message);
                res.status(401).json({message:"No Auth"});
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        //brak tokeny
        res.status(401).json({message:"No Auth"});
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
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
