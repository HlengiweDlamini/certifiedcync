//IMPORT
const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');

//REGISTER USER: GOES TO API/V1/REGISTER
exports.registerUser = catchAsyncErrors( async (req, res, next) => {

    const { name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password
    })
    //CALL JSON WEBTOKEN AND ASSIGN TO USER
    sendToken(user, 200, res);

})
//LOGIN USER: GOES TO API/V1/LOGIN
exports.loginUser = catchAsyncErrors ( async(req, res, next) => {
    const { email, password } = req.body;

    //CHECK IF EMAIL & PASSWORD ARE ENTERED BY USER
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    //FIND USER IN DATABASE
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    //CHECK IF PASSWORD IS CORRECT
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 200, res);
})

//FORGOT PASSWORD: THAT GOES TO API/V1/PASSWORD/FORGOT
exports.forgotPassword = catchAsyncErrors( async(req, res, next) => {
    
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return next(new ErrorHandler('User with this email not found', 401));
    }

    //GET RESET TOKEN
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    //CREATE RESET PASSWORD URL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email then ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'CertCync Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next (new ErrorHandler(error.message, 500));

    }
})
    
//RESET PASSWORD: THAT GOES TO API/V1/PASSWORD/RESET/:TOKEN
exports.resetPassword = catchAsyncErrors( async(req, res, next) => {

    //HASH URL TOKEN
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user) {
        return next(new ErrorHandler('Password reset token invalid or has been expired', 400));
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400));
    }

    //SETUP NEW PASSWORD
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

})

//GET DETAILS OF CURRENTLY LOGGED IN USER: GOES TO API/V1/PROFILE
exports.getUserProfile = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

//LOGOUT USER: GOES TO API/V1/LOGOUT
exports.logout = catchAsyncErrors( async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'logged out'
    })
})