//IMPORT ERROR HANDLER CLASS
const ErrorHandler = require('../utils/errorHandler');

//CREATE FUNCTION
module.exports = (err, req, res, next) => {
    err.statusCode =err.statusCode || 500;

    //SEPARATE DEVELOPMENT AND PRODUCTION ERROR MESSAGES
    if(process.env.NODE_ENV === 'development'){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }
    //PRODUCTION ERRORS
    if(process.env.NODE_ENV === 'production'){
        let error = {...err};

        error.message = err.message;

        //WRONG MONGOOSE OBJECT ID ERROR
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }
        //HANDLING MONGOOSE VALIDATION ERROR
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value =>  value.message);
            error = new ErrorHandler(message, 400)
        }


        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }   
}