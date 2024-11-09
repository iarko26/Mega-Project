const express=require('express');
const router=express.Router();
const {auth,isStudent,isAdmin,isInstructor}=require('../Middleware/auth');
const {createCourse,getAllCourses,getcourseDetails}=require('../Controller/Course');
const {createcategory,getAllCategory,getcatergoryPage}=require('../Controller/Categories');
const {createSection,updateSection,deleteSection}=require('../Controller/Section');
const {createSubSection,updateSubSection,deleteSubSection}=require('../Controller/SubSection');
const {createRating,getAverageRating,getAllRating}=require('../Controller/RatingAndReviews');
//created by instructor
router.post('/createCourse',auth,isInstructor,createCourse);
router.get('/getAllCourses',getAllCourses);
router.get('/getCourseDetails',getcourseDetails);
router.post('/addSection',auth,isInstructor,createSection);
router.post('/updateSection',auth,isInstructor,updateSection);
router.post('/deleteSection',auth,isInstructor,deleteSection);
router.post('/addSubSection',auth,isInstructor,createSubSection);
router.post('/updateSubSection',auth,isInstructor,updateSubSection);
router.post('/deleteSubSection',auth,isInstructor,deleteSubSection);
//created by student
router.post('/createRating',auth,isStudent,createRating);
//created by admin
router.post('/addCategory',auth,isAdmin,createcategory);

router.get('/getAllCategories',getAllCategory);
router.get('/getCategoryPage',getcatergoryPage);
router.get('/getAverageRating',getAverageRating);
router.get('/getAllRating',getAllRating);

module.exports=router;