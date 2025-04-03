import { toast } from "react-toastify";
import { apiconnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
import { resetCart } from "../../redux/slices/CartItem";
import { setPaymentLoading } from "../../redux/slices/Courseslice";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { sendPaymentSuccessEmail, verifysignature } from "../../../Server/Controller/Payment";

const {
    COURSEPAYMENT_API,
    COURSEVERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API

}=studentEndpoints

//
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export async function BuyCourse(
   token,courses,navigate,dispatch,user_details
){
    const toastId=toast.loading("Loading...")
    try{
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            toast("Razorpay SDK failed to load. Are you online?");
            return;
        }
        const orderResponse=await apiconnector("POST",COURSEPAYMENT_API,{
           courses 
        },{
            Authorization: `Bearer ${token}`,
        })

        if(!orderResponse.data.success){
            toast.error("Could not initiate order")
            return
        }
        console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)

        const options={
            key:process.env.RAZORPAY_KEY_SECRET,
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description:"Thank you for Purchasing the Course.",
            image:rzpLogo,
            prefill:{
               name:`${user_details.firstname} ${user_details.lastname}`,
                email:`${user_details.email}`,
               
            },
            handler: async function (response) {
               sendPaymentSuccessEmail(
                token,
                response,
                orderResponse.data.data.amount
               )
               verifysignature(
                {
                    ...response,
                    courses
                },
                token,
                navigate,
                dispatch,
               )
            },
        }
        const paymentObject=new window.Razorpay(options)
        paymentObject.open()
        paymentObject.on("payment.failed", function (response) {
          toast.error("Oops! Payment Failed.")
          console.log(response.error)
        })



    }
    catch(error){
        console.log("PAYMENT API ERROR............", error)
        toast.error("Could Not make Payment.")
    }
    toast.dismiss(toastId)
    
}

async function verifyPayment(bodyData,token,navigate,dispatch){
const toastId=toast.loading("Verifying Payment...")
dispatch(setPaymentLoading(true))
try{
    const response=await apiconnector("POST",COURSEVERIFY_API,bodyData,{
        Authorization: `Bearer ${token}`,
    })
    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)
    if(!response.data.success){
        throw new Error(response.data.message)  
    }
    toast.success("Payment Verified")
    navigate("/dashboard/enrolled-courses")
    dispatch(resetCart())

}
catch(error){
    console.log("PAYMENT VERIFY ERROR............", error)
    toast.error("Could Not Verify Payment.")
}
toast.dismiss(toastId)
dispatch(setPaymentLoading(false))

}
async function sendPaymentSuccessEmail(response,amount,token){
    try{
       await apiconnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount
        },{
            Authorization: `Bearer ${token}`,
        })
    }
    catch(error){
        console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
    }

}
