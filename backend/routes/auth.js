//IMPORT
const express = require('express');
const router = express.Router();

//IMPORT USER FUNCTIONS
const { 
    registerUser, 
    loginUser, 
    forgotPassword, 
    resetPassword, 
    getUserProfile, 
    updatePassword, 
    logout 
} = require('../controllers/userController');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/profile').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router.route('/logout').get(logout);

module.exports = router;