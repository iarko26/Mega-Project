import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:null,
}
const ProfileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setuser:(state,action)=>{
            state.user=action.payload
        }
    }
});
export const {setuser}=ProfileSlice.actions;
const profileReducer=ProfileSlice.reducer;
export default profileReducer;