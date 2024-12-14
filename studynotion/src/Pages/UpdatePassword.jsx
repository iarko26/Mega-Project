import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { resetPassword } from '../Services/operations/authAPI';
function UpdatePassword() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const {loading}=useSelector((state)=>state.auth);
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:""
    })
    const {password,confirmPassword}=formData;
    const handleOnChange=(e)=>{
        e.preventDefault();
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }))
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const token=location.pathname.split("/").at(-1)
        dispatch(resetPassword(password,confirmPassword,token,navigate))
       
    }


  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
    {
        loading?
        (<div className='spinner'></div>):(
            <div className='max-w-[500px]  p-4 lg:p-8'>
                <h1 className= "text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-900">
                    Choose a new password
                </h1>
                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-200">
                Almost done. Enter your new password and youre all set.
                </p>
                <form onSubmit={handleOnSubmit
                }>
                     <label className='relative'>
                     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">New Password <sup className='text-blue-200'>*</sup></p>
                          <input
                          required={true}
                          type={showPassword?"text":"password"}
                          name="password"
                          value={password}
                          placeholder='Enter Password'
                          onChange={handleOnChange}
                          className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
                          />
                          <span onClick={()=>setShowPassword((prev)=>!prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                             {
                                showPassword?
                                (<AiOutlineEyeInvisible  fontSize={24} fill="#AFB2BF" />)
                                :( <AiOutlineEye  fontSize={24} fill="#AFB2BF" />)
                             }
                          </span>
                     </label>
                     <label className="relative mt-3 block">
                     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">Confirm Password <sup className='text-blue-200'>*</sup></p>
                        <input
                          required={true}
                          type={showConfirmPassword?"text":"password"}
                          name="confirmPassword"
                          value={confirmPassword}
                          placeholder='Enter Confirm Password'
                          onChange={handleOnChange}
                          className='bg-white rounded-md text-richblack-600 w-full p-[12px]'

                          />
                          <span onClick={()=>setShowConfirmPassword((prev)=>!prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                             {
                                showConfirmPassword?
                                (<AiOutlineEyeInvisible  fontSize={24} fill="#AFB2BF" />)
                                :( <AiOutlineEye  fontSize={24} fill="#AFB2BF" />)
                             }
                          </span>
                     </label>
                     <button type='submit'  className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                          Reset Password
                     </button>
                </form>
                <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-blue-200">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>

            </div>
        )
    }
      
    </div>
  )
}

export default UpdatePassword
