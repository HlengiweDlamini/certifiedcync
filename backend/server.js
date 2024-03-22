//IMPORT APP
const app = require('./app');
//IMPORT FUNCTION TO CONNECT TO DATABASE
const connectDatabase = require('./config/database');

//IMPORTING DOTENV
const dotenv = require('dotenv');

//HANDLE UNCAUGHT EXCEPTIONS
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1)
})

//SETTING UP CONFIG FILE
dotenv.config({path: 'backend/config/config.env'})

//CALL FUNCTION TO CONNECT TO DATABASE
connectDatabase();

const server = app.listen(process.env.PORT, () =>{
    //CALLBACK
    console.log(`Server has started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

//UNHANDLED PROMISE REJECTIONS(NOT WORKING)
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down server due to unhandled rejections');
    server.close(() => {
        process.exit(1)
    })
})
