//IMPORT APP
const app = require('./app');
//IMPORT FUNCTION TO CONNECT TO DATABASE
const connectDatabase = require('./config/database');

//IMPORTING DOTENV
const dotenv = require('dotenv');

//SETTING UP CONFIG FILE
dotenv.config({path: 'backend/config/config.env'})

//CALL FUNCTION TO CONNECT TO DATABASE
connectDatabase();

app.listen(process.env.PORT, () =>{
    //CALLBACK
    console.log(`Server has started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
