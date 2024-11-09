import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState={
    carts:[],
    total:0,
    totalItems:0

}
const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        //addToCart
        addCart:(state,action)=>{
            const course=action.payload
            const existingCourse=state.carts.find((item)=>item._id===course._id);
            if(existingCourse){
                toast.error("Course already in cart")
                return
            }
            state.carts.push(course)
            state.totalItems++
            state.total+=course.price;
            toast.success("Course added to cart")

        },
        
        //removeFromCart
        removecart:(state,action)=>{
            const courseId=action.payload;
            const existingCourse=state.carts.find((item)=>item._id===courseId);
            if(existingCourse){
                state.totalItems--
                state.total-=existingCourse.price;
                state.carts=state.carts.filter((item)=>item._id!==courseId);
                toast.success("Course removed from cart")
                
               
            }


        },
        //resetCart
        resetCart:(state)=>{
            state.carts=[]
            state.total=0
            state.totalItems=0
        }
    }


});
export const {addCart,removecart,resetCart}=cartSlice.actions;
const cartReducer=cartSlice.reducer;
export default cartReducer;