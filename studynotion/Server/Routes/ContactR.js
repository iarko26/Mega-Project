const express=require('express');
const router=express.Router();
const {contactController}=require('../Controller/Contact');
router.post('/contact',contactController);
module.exports=router;