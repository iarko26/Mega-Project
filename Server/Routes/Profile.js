const express=require('express');
const router=express.Router();
const {auth}=require('../Middleware/auth');
const {updateProfile,deleteprofile,getalldetails,updateDisplyaPicture,getEnrolledCourses}=require('../Controller/Profile');
router.put('/updateProfile',auth,updateProfile);
router.delete('/deleteProfile',auth,deleteprofile);
router.get('/getUserDetails',auth,getalldetails);
router.put('/updateDisplayPicture',auth,updateDisplyaPicture);
router.get('/getEnrolledCourses',auth,getEnrolledCourses);
module.exports=router;