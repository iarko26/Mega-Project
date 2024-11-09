import { authEndpoints } from "../apis";
import { toast } from "react-toastify";
import {apiconnector} from "../apiconnector";
import { setToken,setloading } from "../../redux/slices/Authslice";
import {setuser} from "../../redux/slices/Profile";
import {resetCart} from "../../redux/slices/CartItem";

const {
    SIGNUP_API,
    LOGIN_API,
    SENDOTP_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API
    
}=authEndpoints

export function sendOtp(
    email,
    navigate
){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setloading(true))
        try{
            const response=await apiconnector("POST",SENDOTP_API,{
                email,
                checkUser:true

            }
            

            )
            console.log("response of otp",response.data)
            if(!response.data.success){
                toast.error(response.data.message);

            }
            toast.success("otp sent successfully");
            navigate("/verify-email")

        }
        catch(error){
            toast.error("otp sending failed");
            



        }
        dispatch(setloading(false))
        toast.dismiss(toastId)


    }
}
export function signUp(
    accountType,
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setloading(true))
        try{
            const response=await apiconnector("POST",SIGNUP_API,{
                accountType,
                firstname,
                lastname,
                email,
                password,
                confirmPassword,
                otp

            }

        )
        console.log("response of signup",response.data)
        if(!response.data.success){
            toast.error(response.data.message)
            
        }
        
        toast.success("Signup Successfull")
        navigate("/login")

        }
        catch(error){
            console.log("error in signup",error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
       
        dispatch(setloading(false))
        toast.dismiss(toastId)
       
    }
}
export function Login(
    email,
    password,
    navigate

){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setloading(true))
        try{
            const response=await apiconnector("POST",LOGIN_API,{
                email,
                password
            })
            console.log("response of login",response.data)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            const userImage=response.data?.user?.image ?
            (
                response.data.user.image
            ):(
                `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            )
            dispatch(setuser(
               {
                ...response.data.user,
                image:userImage
               }
            ))
            navigate("/dashboard/my-profile")
            


      
        }
        catch(error){
            toast.error("Login Failed")
            navigate("/login")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
            
        
    }

}

export function logout(navigate){
 return async(dispatch)=>{
    dispatch(setToken(null))
    dispatch(setuser(null))
    dispatch(resetCart())
    navigate("/login")
 }
}

export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setloading(true))
        try{
            const response=await apiconnector("POST",RESETPASSWORDTOKEN_API,{
                email
            }

        )
        console.log("response of password reset token",response.data)
        if(!response.data.success){
            toast.error(response.data.message)
        }
        toast.success("Password Reset Token Sent Successfully")
        setEmailSent(true)
        }
        catch(error){
            toast.error("Failed to send email for resetting password")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }


}
export function resetPassword(password,confirmPassword,token){
    return async(dispatch)=>{
        const toastId=toast.loading("loading...")
        dispatch(setloading(true))
        try{
            const response=await apiconnector("POST",RESETPASSWORD_API,{
                password,
                confirmPassword,
                token
            })
            console.log("response of password reset",response.data)
            if(!response.data.success){
                toast.error(response.data.message)
            }

            toast.success("Password has been reset successfully")

        }
        catch(error){
            toast.error("Failed to reset password")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}