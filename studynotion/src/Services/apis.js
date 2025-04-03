
export const BASE_URL='http://localhost:5000/api/v1'
//auth endpoints
export const authEndpoints={
    SIGNUP_API:BASE_URL + "/auth/signup",
    LOGIN_API:BASE_URL + "/auth/login",
    SENDOTP_API:BASE_URL + "/auth/sendotp",
    RESETPASSWORDTOKEN_API:BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API:BASE_URL + "/auth/reset-password",
    

}
//profile endpoints
export const profileEndpoints={
   
   
    GETUSERDETAILS_API:BASE_URL + "/profile/getUserDetails",
    
    GETENROLLEDCOURSES_API:BASE_URL + "/profile/getEnrolledCourses",
    GETINSTURCTORDATA_API:BASE_URL + "/profile/instructorDashboard"
}
//student endpoints
export const studentEndpoints={
    COURSEPAYMENT_API:BASE_URL + "/payment/capturePayment",
    COURSEVERIFY_API:BASE_URL + "/payment/verifySignature",
    SEND_PAYMENT_SUCCESS_EMAIL_API:BASE_URL + "/payment/sendPaymentSuccessEmail"
    
}
//course endpoints 
export const courseEndpoints={
    CREATECOURSE_API:BASE_URL + "/course/createCourse",
    EDITCOURSE_API:BASE_URL + "/course/editCourse",
    DELETECOURSE_API:BASE_URL + "/course/deleteCourse",
    COURSECATERGORY_API:BASE_URL + "/course/getAllCategories",
    GETFULLALLCOURSES_API:BASE_URL + "/course/getFullCourseDetails",
    GETINSTRUCTORCOURSES_API:BASE_URL + "/course/getInstructorCourses",

    GETALLCOURSES_API:BASE_URL + "/course/getAllCourses",
    GETCOURSEDETAILS_API:BASE_URL + "/course/getCourseDetails",
    CREATESECTION_API:BASE_URL + "/course/addSection",
    UPDATESECTION_API:BASE_URL + "/course/updateSection",
    DELETESECTION_API:BASE_URL + "/course/deleteSection",
    CREATESUBSECTION_API:BASE_URL + "/course/addSubSection",
    UPDATESUBSECTION_API:BASE_URL + "/course/updateSubSection",
    DELETESUBSECTION_API:BASE_URL + "/course/deleteSubSection",
    CREATERATING_API:BASE_URL + "/course/createRating",
    COURSE_PROGRESS_UPDATE:BASE_URL + "/course/updateCourseProgress",
   LECTURE_COMPLETION_API: BASE_URL + "/course/markedAsCompleted",
     CREATECATEFORY_API:BASE_URL + "/course/addCategory",
     ADD_COURSE_TO_CATEGORY_API: BASE_URL + "/course/addCourseToCategory"



}
export const categories={
    CATEGORIES_API:BASE_URL + "/course/getAllCategories",
    

}
export const catalogData={
    CATALOGDATA_API:BASE_URL + "/course/getCategoryPage"
}
export const ratingsEndpoints={
    REVIEW_API:BASE_URL + "/course/getAllRating",
    AVERAGERATING_API:BASE_URL + "/course/getAverageRating"
}
export const contactUsEndpoints={
    CONTACTUS_API:BASE_URL + "/reach/contact"
}
//setting page
export const settingsEndpoints={
    UPDATEDISPLAYPICTURE_API:BASE_URL + "/profile/updateDisplayPicture",
    UPDATEPROFILE_API:BASE_URL + "/profile/updateProfile",
    DELETEPROFILE_API:BASE_URL + "/profile/deleteProfile",
    CHANGEPASSWORD_API:BASE_URL + "/auth/changepassword"
}