import { toast } from "react-toastify"
import { apiconnector } from "../apiconnector"
import { catalogData } from "../apis"

export const getCatalogPageData=async(categoryId)=>{
    let toastId=toast.loading("Loading...")
     let result=[]
    try{
     
     const response=await apiconnector(
        "POST",
        catalogData.CATALOGDATA_API,{
            categoryId:categoryId
        }

     )
     if(!response?.data?.success){
        throw new Error("Could Not Fetch Catagory page data.")
     }
     result=response?.data

    }
    catch(e){
        console.log("CATALOGPAGEDATA_API API ERROR............",e)
        toast.error(e.message)
        result=e.response?.data

    }
    toast.dismiss(toastId)
    return result

}
