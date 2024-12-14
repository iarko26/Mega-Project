import { toast } from "react-toastify"
import { setloading,setToken } from "../../redux/slices/Authslice"
import { resetCart } from "../../redux/slices/CartItem"
import { setuser } from "../../redux/slices/Profile"
import { apiconnector } from "../apiconnector"
import { authEndpoints } from "../apis"
const {
    SIGNUP_API,
    LOGIN_API,
    SENDOTP_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API
    
}=authEndpoints

export function sendOtp(email,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setloading(true))
        try{
            const response=await apiconnector("POST",SENDOTP_API,{
                email,
                checkUser:true,
            })
            console.log("SENDOTP API RESPONSE....",response)
            console.log(response.data.success)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        }
        catch(error){
            console.log("OTP error:",error)
            toast.error("Could not send OTP")
        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}

export function signup(
    accountType,
    firstname,
    lastname,
    email,
    password,
    confirmpassword,
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
                confirmpassword,
                otp,

            })
            console.log("SIGNUP API RESPONSE....",response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")

        }
        catch(error){
            console.log("SIGNUP API ERROR.....",error)

            toast.error("Signup Failed")
            navigate("/signup")

        }
        dispatch(setloading(false))
        toast.dismiss(toastId)
    }
}

export function Login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setloading(true));
        try {
            const response = await apiconnector("POST", LOGIN_API, { email, password });
            console.log("LOGIN API RESPONSE....", response);

            // Check API response success
            if (!response.data.success) {
                throw new Error(response.data.message); // This will jump to the catch block
            }

            // If success, show success toast and proceed
            toast.success("Login Successful");

            // Set token and user details
            dispatch(setToken(response.data.token));
            const userImage = response.data?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstname}+${response.data.user.lastname}`;
            dispatch(setuser({ ...response.data.user, image: userImage }));

            // Save token and user details in localStorage
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));

            // Navigate to dashboard
            navigate("/dashboard/my-profile");
        } catch (error) {
            console.error("LOGIN API ERROR............", error);
            toast.error(error.message || "Login Failed");
        } finally {
            dispatch(setloading(false));
            toast.dismiss(toastId);
        }
    };
}


export function logout(navigate){
 return (dispatch)=>{
      dispatch(setToken(null))
      dispatch(setuser(null))
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logout Successful")
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
export function resetPassword(password,confirmpassword,token){
    return async(dispatch)=>{
        const toastId=toast.loading("loading...")
        dispatch(setloading(true))
        try{
            const response=await apiconnector("POST",RESETPASSWORD_API,{
                password,
                confirmpassword,
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