const express=require('express');
const router=express.Router();
const {signUp,login,sendOTP,changePassword}=require('../Controller/Auth');
const {resetPasswordtoken,resetPassword}=require('../Controller/Resetpwd');
const {auth}=require('../Middleware/auth');

//route for user login
router.post('/login',login);
//route for user signup
router.post('/signup',signUp);
//route for sending otp to the user's email
router.post('/sendotp',sendOTP);
//route for changing the password
router.post('/changepassword',auth,changePassword);

//route for generating a reset password token
router.post('/reset-password-token',resetPasswordtoken);
//route for resetting user's password after verification
router.post('/reset-password',resetPassword);

module.exports=router;