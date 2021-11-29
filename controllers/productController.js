const Product = require('../models/Product')

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
