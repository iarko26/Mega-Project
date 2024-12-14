import { createSlice } from "@reduxjs/toolkit"


const initialState={
    courseSectionData:[],
    courseEntireData:[],
    completedLectures:[],
    totalNoLectures:0
    
}
const viewCourseSlice=createSlice({
 name:"viewCourse",
 initialState,
 reducers:{
    setCourseSectionData:(state,action)=>{
        state.courseSectionData=action.payload
    },
    setEntireCourseData:(state,action)=>{
        state.courseEntireData=action.payload
    },
    setTotalNoLectures:(state,action)=>{
        state.totalNoLectures=action.payload
    },
    setCompletedLectures:(state,action)=>{
        state.completedLectures=[...state.completedLectures,action.payload]
    }


 }
})
export const{
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoLectures,
    setCompletedLectures
}=viewCourseSlice.actions
const viewCourseReducer=viewCourseSlice.reducer
export default viewCourseReducer