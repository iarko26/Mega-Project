

import { updateProfile } from "../../../../Services/operations/settingsAPI"
import { useDispatch,useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]
export default function EditProfile() {

const {token}=useSelector((state)=>state.auth)
const {user}=useSelector((state)=>state.profile)
const navigate=useNavigate()
const dispatch=useDispatch()
const {
    register,
    handleSubmit,
    formState: { errors },

}=useForm()

const submitProfileForm=async(data)=>{
    try{
        dispatch(updateProfile(token,data))
    }catch (error) {
        console.log("ERROR MESSAGE - ", error.message)
      }
}

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-white p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-900">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter first name"
                className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
                {...register("firstname", { required: true })}
                defaultValue={user?.firstname}
              />
              {
                errors.firstname && 
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              }
             
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastname" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter Last name"
                className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
                {...register("lastname", { required: true })}
                defaultValue={user?.lastname}
               />
               {
                errors.firstname && 
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Last name.
                </span>
               }
           
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
                {
                    ...register('dob',{
                      required:{
                        value:true,
                        message:"Please enter your Date of Birth."
                      },
                      max:{
                        value:new Date().toISOString().split('T')[0],
                        message:"Please enter a valid Date of Birth."
                      }

                    })
                   
                    
                }
                defaultValue={user?.additonalInfo?.dob}
              />
              {
                errors.dob && 
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dob.message}
                </span>
              }
            
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
               className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
               {
                ...register("gender",{
                    required:true
                })
               }
               defaultValue={user?.additonalInfo?.gender}
              >
              {
                genders.map((elem,i)=>{
                    return(
                        <option value={elem} key={i}>{elem}</option>
                    )
                })
              }
                
              </select>
              {
                errors.gender &&
                <span className="-mt-1 text-[12px] text-yellow-100">
                 Select Gender
                </span>
              }
              
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additonalInfo?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
          
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
                {...register("about", { required: true })}
                defaultValue={user?.additonalInfo?.about}
              />
          
            </div>
          </div>
          <div className="flex justify-end gap-2">
          <button
            onClick={()=>navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-blue-200 py-2 px-5 font-semibold text-white"
          >
            Cancel
          </button>
           <button className="cursor-pointer rounded-md bg-[#FFF0E5] py-2 px-5 font-semibold text-black" type="submit">
            Save
           </button>
        </div>
        </div>

        
      </form>
    </>
  )
}