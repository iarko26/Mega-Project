import { createSlice } from "@reduxjs/toolkit";


const initialState={
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    signupData:null,
    loading:false,


}
const Authslice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupdata(state,value){
            state.signupData=value.payload
        },
        setToken(state,value){
            state.token=value.payload
        },
        setloading(state,value){
            state.loading=value.payload
        }
    }
})
export const {setToken,setSignupdata,setloading}=Authslice.actions;
const authreducer=Authslice.reducer;
export default authreducer