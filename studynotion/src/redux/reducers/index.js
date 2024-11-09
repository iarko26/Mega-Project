import { combineReducers } from "@reduxjs/toolkit";
import authreducer from '../slices/Authslice'
import profileReducer from "../slices/Profile";
import cartReducer from "../slices/CartItem";
const rootReducer=combineReducers({
    auth:authreducer,
    profile:profileReducer,
    cart:cartReducer

})
export default rootReducer