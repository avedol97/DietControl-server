const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [4, 'Min password length is 6 characters']
    },
    role: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        default: "None"
    },
    dateOfBirth: {
        type: Date,
        default: Date.parse("01.01.1921")
    },
    height: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    activity: {
        type: Number,
        default: 0
    },
    kcalMid: {
        type: Number,
        default: 0
    }

})

// userSchema.post('save', function (doc, next) {
//     console.log('new user was created & saved', doc);
//     next();
// })

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email,password){
    const user = await  this.findOne({email});
    if(user){
       const auth = await bcrypt.compare(password,user.password);
       if(auth){
           return user;
       }
       throw Error('incorrect password');
    }
    throw  Error('incorrect email');
}

const User = mongoose.model('user', userSchema)

module.exports = User;
