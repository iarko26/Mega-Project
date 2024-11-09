import { createSlice } from "@reduxjs/toolkit";


const initialState={
    token:null,
    signupuserData:null,
    loading:false,


}
const Authslice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupdata:(state,action)=>{
            state.signupuserData=action.payload
        },
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setloading:(state,action)=>{
            state.loading=action.payload
        }
    }
})
export const {setToken,setSignupdata,setloading}=Authslice.actions;
const authreducer=Authslice.reducer;
export default authreducer