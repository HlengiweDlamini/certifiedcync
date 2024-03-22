//IMPORT
const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//REGISTER USER: GOES TO API/V1/REGISTER
exports.registerUser = catchAsyncErrors( async (req, res, next) => {

    const { name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password
    })
    //CALL JSON WEBTOKEN AND ASSIGN TO USER
    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    })
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
    
    const token = user.getJwtToken();

    res.status(200).json({
        success: true,
        token
    })

})