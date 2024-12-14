import { createSlice } from "@reduxjs/toolkit";
const initialState={
    step:1,
    course:null,
    paymentLoading:false,
    editCourse:false,
}
const courseSlice=createSlice({
    name:"course",
    initialState:initialState,
    reducers:{
        setStep:(state,action)=>{
            state.step=action.payload
        },
        setCourse:(state,action)=>{
            state.course=action.payload
        },
        setPaymentLoading:(state,action)=>{
            state.paymentLoading=action.payload
        },
        setEditCourse:(state,action)=>{
            state.editCourse=action.payload
        },
        resetCourse:(state)=>{
            state.step=1
            state.course=null
            state.editCourse=false
        }
    }
})
export const {
    setStep,
    setCourse,
    setPaymentLoading,
    setEditCourse,
    resetCourse
}=courseSlice.actions   
const courseReducer=courseSlice.reducer;
export default courseReducer