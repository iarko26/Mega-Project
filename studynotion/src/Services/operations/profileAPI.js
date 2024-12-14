import { toast } from "react-toastify";
import { setuser,setloading } from "../../redux/slices/Profile";
import { apiconnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { logout } from "./authAPI";
const{
    GETUSERDETAILS_API,
    GETENROLLEDCOURSES_API
}=profileEndpoints

export async function getUSerEnrolledCourses(token){
    const toastId=toast.loading("Loading...")
    let result=[]
    try{
        const response=await apiconnector(
            "GET",
            GETENROLLEDCOURSES_API,
            null,{
                Authorization:`Bearer ${token}`,
            }

        )
        console.log("GETENROLLEDCOURSES API RESPONSE............",response)
        if(!response.data.success){
            console.log("GETENROLLEDCOURSES API ERROR............",response.data.message)
        }
        result=response.data.data
    }
    catch(error){
        console.log("GETENROLLEDCOURSES API ERROR............",error)
        toast.error("Could not get enrolled courses")
    }
    toast.dismiss(toastId)
    return result


}
export function getUserDetails(token,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setloading(true))
        try{
            const response=await apiconnector(
                "GET",
                GETUSERDETAILS_API,
                null,{
                    Authorization:`Bearer ${token}`,
                }
            )
            console.log("GETUSERDETAILS API RESPONSE............",response)
            if(!response.data.success){
               throw new Error(response.data.message)
            }
            const userImage = response.data?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstname}+${response.data.user.lastname}`;
            dispatch(setuser({ ...response.data.user, image: userImage }));
        }
        catch(error){
            console.log("GETUSERDETAILS API ERROR............",error)
            toast.error("Could not get user details")
            dispatch(logout(navigate))
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}

