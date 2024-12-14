import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
}
const ProfileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setuser(state,value){
            state.user=value.payload;
        },
        setloading(state,value){
            state.loading=value.payload;
        }
    }
});
export const {setuser,setloading}=ProfileSlice.actions;
const profileReducer=ProfileSlice.reducer;
export default profileReducer;