//IMPORT
const express = require('express');
const router = express.Router();

//IMPORT USER FUNCTIONS
const { registerUser, loginUser } = require('../controllers/userController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;