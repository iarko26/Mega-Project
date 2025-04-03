const express=require('express');
const router=express.Router();
const {auth,isStudent,isAdmin,isInstructor}=require('../Middleware/auth');
const {createCourse,getAllCourses,getcourseDetails,getFullCourseDetails,getInstructorCourses,editcourse,deleteCourse,markedAsCompleted}=require('../Controller/Course');
const {createcategory,getAllCategory,getcatergoryPage,addCourseToCategory}=require('../Controller/Categories');
const {createSection,updateSection,deleteSection}=require('../Controller/Section');
const {createSubSection,updateSubSection,deleteSubSection}=require('../Controller/SubSection');
const {createRating,getAverageRating,getAllRating}=require('../Controller/RatingAndReviews');
const {updateCourseProgress}=require('../Controller/courseProgress');
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
router.post('/editCourse',auth,isInstructor,editcourse);
router.get('/getInstructorCourses',auth,isInstructor,getInstructorCourses);
router.post('/getFullCourseDetails',auth,getFullCourseDetails);
router.delete('/deleteCourse',auth,isInstructor,deleteCourse);
//created by student
router.post('/createRating',auth,isStudent,createRating);
router.post('/updateCourseProgress',auth,isStudent,updateCourseProgress);
router.post('/markedAsCompleted',auth,isStudent,markedAsCompleted);

//created by admin
router.post('/addCategory',auth,isAdmin,createcategory);
router.post('/addCourseToCategory',auth,isInstructor,addCourseToCategory);

router.get('/getAllCategories',getAllCategory);
router.post('/getCategoryPage',getcatergoryPage);
router.get('/getAverageRating',getAverageRating);
router.get('/getAllRating',getAllRating);

module.exports=router;