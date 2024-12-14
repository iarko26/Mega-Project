import React from 'react'
import {useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { RiEditBoxLine } from "react-icons/ri"
import { FormateDate } from '../../../utils/dateformatter';
function MyProfile() {
    const {user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();
    
  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-900">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-white p-8 px-12">
        <div className="flex items-center gap-x-4">
            <img
              src={user?.image}
              alt={`profile-${user?.firstname}`}
               className="aspect-square w-[78px] rounded-full object-cover"
              />
              <div className="space-y-1">
                  <p className="text-lg font-semibold text-richblack-900">
                    {user?.firstname + " " + user?.lastname}
                    
                  </p>
                  <p  className="text-sm text-richblack-500">
                    {
                        user?.email
                    }
                  </p>
              </div>
        </div>
        <button className="cursor-pointer rounded-lg bg-blue-200 py-[8px] px-[20px] font-semibold text-white flex items-center gap-1" onClick={()=>navigate("/dashboard/settings")}>
        <RiEditBoxLine className="text-lg" />
            Edit
            
        </button>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-white p-8 px-12">
         <div  className="flex w-full items-center justify-between">
             <p className="text-lg font-semibold text-richblack-900">
              Personal Information
             </p>
             <button className="cursor-pointer rounded-lg bg-blue-200 py-[8px] px-[20px] font-semibold text-white flex items-center gap-1" onClick={()=>navigate("/dashboard/settings")}>
        <RiEditBoxLine className="text-lg" />
            Edit
            
        </button>
         </div>
         <div className="flex max-w-[500px] justify-between">
           <div className="flex flex-col gap-y-5">
               <div>
                   <p className='text-richblack-500 mb-2 text-sm'>First Name</p>
                    <p className='text-richblack-900 font-semibold'>
                    {user?.firstname}
                    </p>
               </div>
               <div>
                   <p className='text-richblack-500 mb-2 text-sm'>Email Address</p>
                    <p className='text-richblack-900 font-semibold'>
                    {user?.email}
                    </p>
               </div>
               <div>
                   <p className='text-richblack-500 mb-2 text-sm'>Gender</p>
                    <p className='text-richblack-900 font-semibold'>
                    {user?.additionalInfo?.gender ?? "Add Gender"}
                    </p>
               </div>
               
           </div>
           <div className="flex flex-col gap-y-5">
             <div>
                   <p className='text-richblack-500 mb-2 text-sm'>Last Name</p>
                    <p className='text-richblack-900 font-semibold'>
                    {user?.lastname}
                    </p>
               </div>
               <div>
                   <p className='text-richblack-500 mb-2 text-sm'>Contact Number</p>
                    <p className='text-richblack-900 font-semibold'>
                    {user?.additionalInfo?.contactNumber ?? "Contact Number"}
                    </p>
               </div>
               <div>
                   <p className='text-richblack-500 mb-2 text-sm'>Contact Number</p>
                    <p className='text-richblack-900 font-semibold'>
                    {FormateDate(user?.additionalInfo?.dob) ?? "Date of Birth"}
                    </p>
               </div>

             
           </div>
         </div>
      </div>
     
      
      
      
    </div>
  )
}

export default MyProfile
