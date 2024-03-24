//IMPORT EXPRESS
const express = require('express');
const app= express();

const cookieParser = require('cookie-parser');

//IMPORT MIDDLEWARE
const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookieParser());

//IMPORT ALL ROUTES
const certifications = require('./routes/cert');
const auth = require('./routes/auth');

app.use('/api/v1', certifications);
app.use('/api/v1', auth);


//MIDDLEWARE TO HANDLE ALL ERRORS
app.use(errorMiddleware);


//EXPORT MODULE INORDER TO USE APP IN SERVER
module.exports = app