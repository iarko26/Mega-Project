import { toast } from "react-toastify";
import { apiconnector } from "../apiconnector";
import { courseEndpoints } from "../apis";

const {
    CREATECOURSE_API,
    EDITCOURSE_API,
    DELETECOURSE_API,
    COURSECATERGORY_API,
    GETFULLALLCOURSES_API,
    GETINSTRUCTORCOURSES_API,
    GETALLCOURSES_API,
    GETCOURSEDETAILS_API,
    CREATESECTION_API,
    UPDATESECTION_API,
    DELETESECTION_API,
    CREATESUBSECTION_API,
    UPDATESUBSECTION_API,
    DELETESUBSECTION_API,
    CREATERATING_API,
    LECTURE_COMPLETION_API,
    CREATECATEFORY_API,
    ADD_COURSE_TO_CATEGORY_API
}=courseEndpoints
export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
      const response = await apiconnector(
          "POST",
          CREATECOURSE_API,
          data,
          {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
          }
      );
      
      if (!response?.data?.success) {
          throw new Error(response?.data?.message || "Could Not Add Course Details");
      }
      
      toast.success("Course Created Successfully");
      result = response?.data?.data;
  } catch (error) {
      console.log("CREATECOURSE API ERROR............", error);
      toast.error(error.message || "Could not create course");
  }
  toast.dismiss(toastId);
  return result;
}

export const editCourseDetails=async(data,token)=>{
    let result=null;
    const toastId=toast.loading("Loading...")
    try{
        const response=await apiconnector(
            "POST",
            EDITCOURSE_API,
            data,
            {
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`,
            }

        )
        console.log("EDITCOURSE API RESPONSE............",response)
        if (!response.data.success){
            throw new Error(response?.data?.message)
        }
        toast.success("Course Updated Successfully");
        result=response?.data?.data
    }
    catch(error){
        console.log("EDITCOURSE API ERROR............",error)
        toast.error("Could not update course")
    }
    toast.dismiss(toastId)
    return result
}
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("DELETE", DELETECOURSE_API, data, {
       Authorization:`Bearer ${token}`,
      })
      console.log("DELETE COURSE API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error("Could Not Delete Course")
      }
      toast.success("Course Deleted")
    } catch (error) {
      console.log("DELETE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
  }

  export const getAllCourses=async ()=>{
    const toastId=toast.loading("Loading...")
    let result=[]
    try{
        const response=await apiconnector(
            "GET",
            GETALLCOURSES_API,

        )
        console.log("GETFULLALLCOURSES API RESPONSE............",response)
        if (!response.data.success){
            throw new Error(response?.data?.message)
        }
        result=response?.data?.data

    }
    catch(error){
        console.log("GETFULLALLCOURSES API ERROR............",error)
        toast.error("Could not get courses")
    }
    toast.dismiss(toastId)
    return result

  }

  export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiconnector("POST", GETCOURSEDETAILS_API, {
        courseId,
      })
      console.log("COURSE_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data
    } catch (error) {
      console.log("COURSE_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
  }

  export const fetchCourseCategories = async () => {
    let result = []
    try {
      const response = await apiconnector("GET", COURSECATERGORY_API )
      console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error("Could Not Fetch Course Categories")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("COURSE_CATEGORY_API API ERROR............", error)
      toast.error(error.message)
    }
    return result
  }
  
  export const createSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("POST", CREATESECTION_API, data, {
        Authorization:`Bearer ${token}`,
      })
      console.log("CREATE SECTION API RESPONSE............", response)
      if (!response.data.success){
        throw new Error("Could Not Create Section")
      }
      toast.success("Course Section Created")
      result = response?.data?.updatedCourseDetails
    } catch (error) {
      console.log("CREATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }



  export const createSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("POST", CREATESUBSECTION_API, data, {
        Authorization:`Bearer ${token}`,
      })
      console.log("CREATE SUB-SECTION API RESPONSE............", response)
      if (!response.data.success){
        throw new Error("Could Not Add Lecture")
      }
      toast.success("Lecture Added")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  
  // update a section
  export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("POST", UPDATESECTION_API, data, {
        Authorization:`Bearer ${token}`,
      })
      console.log("UPDATE SECTION API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error("Could Not Update Section")
      }
      toast.success("Course Section Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  
  // update a subsection
  export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("POST", UPDATESUBSECTION_API, data, {
        Authorization:`Bearer ${token}`,
      })
      console.log("UPDATE SUB-SECTION API RESPONSE............", response)
      if (!response.data.success){
        throw new Error("Could Not Update Lecture")
      }
      toast.success("Lecture Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  
  // delete a section
  export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("POST", DELETESECTION_API, data, {
        Authorization:`Bearer ${token}`,
      })
      console.log("DELETE SECTION API RESPONSE............", response)
      if (!response.data.success){
        throw new Error("Could Not Delete Section")
      }
      toast.success("Course Section Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  // delete a subsection
  export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("POST", DELETESUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error("Could Not Delete Lecture")
      }
      toast.success("Lecture Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


  export const fetchInstructorCourses = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector(
        "GET",
        GETINSTRUCTORCOURSES_API,
        null,
        {
         Authorization: `Bearer ${token}`,
        }
      )
      console.log("INSTRUCTOR COURSES API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error("Could Not Fetch Instructor Courses")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("INSTRUCTOR COURSES API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiconnector(
        "POST",
        GETFULLALLCOURSES_API,
        {
          courseId,
        },
        {
            Authorization: `Bearer ${token}`,
        }
      )
      console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
  }
  
  // mark a lecture as complete
// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("MARK LECTURE COMPLETE API RESPONSE............", response);
    if (!response.data.success) {
      throw new Error("Could Not Mark Lecture as Complete");
    }
    toast.success("Lecture Marked as Complete");
    result = response?.data?.data;


  } catch (error) {
    console.log("MARK LECTURE COMPLETE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

  // create a rating for course
  export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
      const response = await apiconnector("POST", CREATERATING_API, data, {
        Authorization:`Bearer ${token}`,
      })
      console.log("CREATE RATING API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error("Could Not Create Rating")
      }
      toast.success("Rating Created")
      success = true
    } catch (error) {
      success = false
      console.log("CREATE RATING API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }
  export const createCategory=async(data,token)=>{
    const toastId=toast.loading("Loading...")
    let result=false
    try{
      const response=await apiconnector("POST",CREATECATEFORY_API,data,{
        Authorization:`Bearer ${token}`,
      })
      console.log("CREATE CATEGORY API RESPONSE............",response)
      if (!response.data.success){
        throw new Error("Could Not Create Category")
      }
      toast.success("Category Created")
      result=true


    }
    catch(error){
      console.log("CREATE CATEGORY API ERROR............",error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result

  }
  export const addCourseToCategory = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = false;
    try {
      const response = await apiconnector(
        "POST",
        ADD_COURSE_TO_CATEGORY_API,
        data,
        {
          Authorization:`Bearer ${token}`,
        }
      );
      console.log("ADD COURSE TO CATEGORY API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error("Could Not Add Course To Category");
      }
      toast.success("Course Added To Category");
      result = true;
    } catch (error) {
      result = false;
      console.log("ADD COURSE TO CATEGORY API ERROR............", error);
      toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
  };
  



