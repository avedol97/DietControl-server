const mongoose = require('mongoose');


const userPasswordSchema = new mongoose.Schema({
    hashPassword: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [4, 'Min password length is 4 characters']
    }
})


const UserPassword = mongoose.model('password', userPasswordSchema)

module.exports = UserPassword;
