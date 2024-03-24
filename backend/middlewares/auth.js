//IMPORT
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

//CHECK IF USER IS AUTHENTICATED
exports.isAuthenticatedUser = catchAsyncErrors( async(req, res, next) => {

    const { token } = req.cookies;
    
    if(!token) {
        return next (new ErrorHandler('Login to access this resource', 401));
    }
    //VERIFY USER
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();

})