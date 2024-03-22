//IMPORT MONGOOSE & VALIDATOR
const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter yoour name'],
        maxLength: [40, 'Your name cannot exceed 40 characters']
    },
    email: {
        type: String,
        required: [true, 'Enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Enter your password'],
        minLength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
        
})

//EXPORT
module.exports = mongoose.model('User', userSchema);
