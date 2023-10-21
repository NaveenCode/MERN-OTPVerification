const express = require('express');
const router = express.Router();
const { signUp, loginUser, resetPassword, userOtpSend, forgotPassword, updatedPassword } = require('../controllers/UserControllers')


router.route('/signup').post(signUp)
router.route('/login').post(loginUser)
router.route('/sendotp').post(userOtpSend)
router.route('/sendpasswordlink').post(resetPassword)
router.route('/forgotpassword/:id/:token').get(forgotPassword)
router.route("/:id/:token").post(updatedPassword)
module.exports = router;