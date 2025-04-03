const express=require('express');
const router=express.Router();
const {auth,isStudent,isAdmin,isInstructor}=require('../Middleware/auth');

const {capturePayment,verifysignature,sendPaymentSuccessEmail}=require('../Controller/Payment');
router.post('/capturePayment',auth,isStudent,capturePayment);
router.post('/verifySignature',auth,isStudent,verifysignature);
router.post('/sendPaymentSuccessEmail',auth
,isStudent,sendPaymentSuccessEmail);
 
module.exports=router;
