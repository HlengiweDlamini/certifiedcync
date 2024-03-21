//IMPORT EXPRESS
const express= require('express')
//CREATE INSTANCE OF EXPRESS ROUTER
const router = express.Router();


//IMPORT GETCERTS FUNCTION
const { getCerts, newCertification, getSingleCert } = require('../controllers/certController')


//CREATE ROUTE FOR ALL CERTS, GETCERTS FUNCTION HANDLES ROUTE
router.route('/certifications').get(getCerts); //EXECUTED WHEN GET REQUEST IS MADE

//CREATE ROUTE FOR NEW CERT AND POST TO DATABASE
router.route('/certification/new').post(newCertification);

//CREATE ROUTE FOR SINGLE CERT, GETSINGLECERT FUNCTION HANDLES ROUTE
router.route('/certification/:id').get(getSingleCert); 


//EXPORT ROUTER OBJECT FOR OTHER PARTS OF APP TO USE IT
module.exports = router;
