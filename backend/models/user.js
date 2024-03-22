//IMPORT MONGOOSE, VALIDATOR, BCRYPT
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
//ENCRYPT PASSWORD BEFORE SAVING USER
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//RETURN JSON WEB TOKEN
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

//EXPORT
module.exports = mongoose.model('User', userSchema);
