//IMPORT EXPRESS
const express = require('express');
const app= express();

app.use(express.json());


//IMPORT ALL ROUTES
const certifications = require('./routes/cert');


app.use('/api/v1', certifications);



//EXPORT MODULE INORDER TO USE APP IN SERVER
module.exports = app