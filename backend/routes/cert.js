//IMPORT EXPRESS
const express= require('express')
//CREATE INSTANCE OF EXPRESS ROUTER
const router = express.Router();

//IMPORT CERTS FUNCTIONS
const { 
    getCerts, 
    newCertification, 
    getSingleCert, 
    updateCert, 
    deleteCert 
} = require('../controllers/certController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//CREATE ROUTE FOR ALL CERTS, GETCERTS FUNCTION HANDLES ROUTE
router.route('/certifications').get(getCerts); //EXECUTED WHEN GET REQUEST IS MADE

//CREATE ROUTE FOR SINGLE CERT, GETSINGLECERT FUNCTION HANDLES ROUTE
router.route('/certification/:id').get(getSingleCert); 

//----------------------------------------ADMIN ROUTES-----------------------------------------------
//CREATE ROUTE FOR NEW CERT AND POST TO DATABASE
router.route('/admin/certification/new').post(isAuthenticatedUser, authorizeRoles('admin'), newCertification);

//CREATE ROUTE FOR UPDATING AND DELETING CERT
router.route('/admin/certification/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateCert).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCert);


//EXPORT ROUTER OBJECT FOR OTHER PARTS OF APP TO USE IT
module.exports = router;
