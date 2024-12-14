import { settingsEndpoints } from "../apis"


import { toast } from "react-toastify"
import { setuser } from "../../redux/slices/Profile"
import { apiconnector } from "../apiconnector"
import {logout} from "./authAPI"
const{
    UPDATEDISPLAYPICTURE_API,
    UPDATEPROFILE_API,
    DELETEPROFILE_API,
    CHANGEPASSWORD_API
}=settingsEndpoints
export function updateDisplayPicture(token,formData){
    return async (dispatch)=>{
        const toastId=toast.loading("Loading...")
        try{
            const response=await apiconnector(
                "PUT",
                UPDATEDISPLAYPICTURE_API,
                formData,{
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, 
                }

            )
            console.log("UPDATEDISPLAYPICTURE API RESPONSE............",response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            dispatch(setuser(response.data.data))

        }
        catch(error){
            console.log("UPDATEDISPLAYPICTURE API Error............",error)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId)
    }

}


export function updateProfile(token,formData){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        try{
            const response=await apiconnector(
                "PUT",
                UPDATEPROFILE_API,
                formData,{
                    Authorization:`Bearer ${token}`,
                }

            )
            console.log("UPDATEPROFILE API RESPONSE............",response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            const userImage=response.data.updatedUserDetails.image ? response.data.updatedUserDetails.image :`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstname} ${response.data.updatedUserDetails.lastname}`

            dispatch(setuser({...response.data.updatedUserDetails,image:userImage}))
            toast.success("Profile Updated Successfully")

        }
        catch(error){
            console.log("UPDATEPROFILE API Error............",error)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId)
    }
}


export function deleteProfile(token,navigate){
      return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        try{
            const response=await apiconnector(
                  "DELETE",
                  DELETEPROFILE_API,
                  null,{
                    Authorization:`Bearer ${token}`,
                  }



            )
            console.log("DELETEPROFILE API RESPONSE............",response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            dispatch(logout(navigate))
            toast.success("Profile Deleted Successfully")

        }
        catch(error){
            console.log("DELETEPROFILE API Error............",error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId)
      }
}


export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("POST", CHANGEPASSWORD_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }