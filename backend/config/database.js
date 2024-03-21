//IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

//CREATE FUNCTION TO CONNECT TO DATABASE
const connectDatabase = () => {
    //PASS DATABASE URL SPECIFIED IN CONFIG FILE
    mongoose.connect(process.env.DB_LOCAL_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    }).catch(error => {
        console.error('MongoDB connection error:', error);
    });
    
}

//EXPORT FOR FUNCTION TO BE USED ELSEWHERE
module.exports = connectDatabase;