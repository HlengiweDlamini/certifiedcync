//IMPORT EXPRESS
const express = require('express');
const app= express();
//IMPORT MIDDLEWARE
const errorMiddleware = require('./middlewares/errors');

app.use(express.json());

//IMPORT ALL ROUTES
const certifications = require('./routes/cert');

app.use('/api/v1', certifications);
//MIDDLEWARE TO HANDLE ALL ERRORS
app.use(errorMiddleware);


//EXPORT MODULE INORDER TO USE APP IN SERVER
module.exports = app