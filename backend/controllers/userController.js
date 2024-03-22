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

    res.status(201).json({
        success: true,
        user
    })
})