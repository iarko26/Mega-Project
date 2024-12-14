import React, { useState } from 'react'
import { changePassword } from '../../../../Services/operations/settingsAPI'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

function UpdatePassword() {
    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
   
    const [showOldPassword,setShowOldPassword]=useState(false)
    const [showNewPassword,setShowNewPassword]=useState(false)

    const{
        register,
        handleSubmit,
        formState:{errors}

    }=useForm()

    const submitPasswordForm=async(data)=>{
        try{
            await changePassword(token,data)
        }
        catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
          }
    }

  return (
    <div>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-white p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-900">
            Update Password
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword " className="lable-style">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
                {...register("oldPassword", { required: true })}

              />
              <span className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              
              onClick={()=>setShowOldPassword(prev=>!prev)}
              >
                  {
                    showOldPassword?
                    <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                    :
                    <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                  }
              </span>
              {
                errors.oldPassword &&
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              }
             
             
            </div>
            <div className=" relative flex flex-col gap-2  lg:w-[48%]">
              <label htmlFor="newPassword" className="lable-style">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
                {...register("newPassword", { required: true })}
               />
               <span className='absolute right-3 top-[38px] z-[10] cursor-pointer'
              
              onClick={()=>setShowNewPassword(prev=>!prev)}
              >
                  {
                    showNewPassword?
                    <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                    :
                    <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                  }
              </span>
              {
                errors.newPassword &&
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please Enter Your New Password.
                </span>
              }
             
           
            </div>
          </div>

          

          
          <div className="flex justify-end gap-2">
          <button
           onClick={()=>{
            navigate('/dashboard/my-profile')
           }}
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
    </div>
  )
}

export default UpdatePassword
