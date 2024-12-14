import { combineReducers } from "@reduxjs/toolkit";
import authreducer from '../slices/Authslice'
import profileReducer from "../slices/Profile";
import cartReducer from "../slices/CartItem";
import courseReducer from "../slices/Courseslice";
const rootReducer=combineReducers({
    auth:authreducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer

})
export default rootReducer