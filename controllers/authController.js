const User = require('../models/User')
const jwt = require('jsonwebtoken');

//handle errors
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

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'secret', {
        expiresIn: maxAge
    });
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
        const user = await User.create({
            email, password
        });
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user._id});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }

}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({user: user._id, token: token});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }

}

module.exports.detail_post = (req, res) => {
    const {email, gender, dateOfBirth, height, weight, activity, kcalMid} = req.body;
    try {
        User.updateOne({email: email},
            {
                $set:
                    {
                        gender: gender,
                        dateOfBirth: dateOfBirth,
                        height: height,
                        weight: weight,
                        activity: activity,
                        kcalMid: kcalMid
                    }
            },
        )
        res.status(200).json({
            email: email,
            gender: gender,
            dateOfBirth: dateOfBirth,
            height: height,
            weight: weight,
            activity: activity,
            kcalMid: kcalMid
        });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.role_post = async (req, res) => {
    const {email, role} = req.body;
    try {
        const user = await User.findOne({email});
        if (user) {
            User.updateOne({email: email},
                {
                    $set:
                        {
                            role: role,
                        }
                },
            )
            res.status(200).json({
                email: email,
                role: role,
            });
        }
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}
