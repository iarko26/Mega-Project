
const BASE_URL=process.env.REACT_APP_BASE_URL;
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
    
    GETENROLLEDCOURSES_API:BASE_URL + "/profile/getEnrolledCourses"
}
//student endpoints
export const studentEndpoints={
    COURSEPAYMENT_API:BASE_URL + "/payment/capturePayment",
    COURSEVERIFY_API:BASE_URL + "/payment/verifySignature",
    
}
//course endpoints 
export const courseEndpoints={
    CREATECOURSE_API:BASE_URL + "/course/createCourse",
    GETALLCOURSES_API:BASE_URL + "/course/getAllCourses",
    GETCOURSEDETAILS_API:BASE_URL + "/course/getCourseDetails",
    CREATESECTION_API:BASE_URL + "/course/addSection",
    UPDATESECTION_API:BASE_URL + "/course/updateSection",
    DELETESECTION_API:BASE_URL + "/course/deleteSection",
    CREATESUBSECTION_API:BASE_URL + "/course/addSubSection",
    UPDATESUBSECTION_API:BASE_URL + "/course/updateSubSection",
    DELETESUBSECTION_API:BASE_URL + "/course/deleteSubSection",
    CREATERATING_API:BASE_URL + "/course/createRating",


}
export const categories={
    CATEGORIES_API:BASE_URL + "/course/getAllCategories",
    CREATECATEFORY_API:BASE_URL + "/course/addCategory"

}
export const catalogData={
    CATALOGDATA_API:BASE_URL + "/course/getCategoryPage"
}
export const ratingsEndpoints={
    REVIEW_API:BASE_URL + "/course/getAllRating",
    AVERAGERATING_API:BASE_URL + "/course/getAverageRating"
}
export const contactUsEndpoints={
    CONTACTUS_API:BASE_URL + "/reach/contactus"
}
//setting page
export const settingsEndpoints={
    UPDATEDISPLAYPICTURE_API:BASE_URL + "/profile/updateDisplayPicture",
    UPDATEPROFILE_API:BASE_URL + "/profile/updateProfile",
    DELETEPROFILE_API:BASE_URL + "/profile/deleteProfile",
     CHANGEPASSWORD_API:BASE_URL + "/auth/changepassword"
}