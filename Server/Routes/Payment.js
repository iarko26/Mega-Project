const express=require('express');
const router=express.Router();
const {auth,isStudent,isAdmin,isInstructor}=require('../Middleware/auth');

const {capturePayment,verifysignature}=require('../Controller/Payment');
router.post('/capturePayment',auth,isStudent,capturePayment);
router.post('/verifySignature',verifysignature);
module.exports=router;
