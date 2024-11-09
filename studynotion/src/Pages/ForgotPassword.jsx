import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPasswordResetToken } from '../Services/operations/authAPI'
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi"
function ForgotPassword() {
    const {loading}=useSelector((state)=>state.auth)
    const [email,setemail]=useState('');
    const [emailSent,setEmailSent]=useState(false);
    const dispatch=useDispatch();


    
    
    let handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))
    }

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
      {
        loading?
        (<div className='spinner'></div>):(
            <div className='max-w-[500px] p-4 lg:p-8'>
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-900">
                {
                  !emailSent?
                  "Reset your password":"Check email"
                }

                </h1>
                <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-400'>
                  {
                    !emailSent?
                    "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email} `
                  }
                </p>
                <form onSubmit={handleOnSubmit}>
                {
                  !emailSent && (
                    <label className='w-full'>
                      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">Email Address <sup className='text-blue-200'>*</sup></p>
                      <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e)=>setemail(e.target.value)}
                        placeholder='Enter email address'

                        required
                        className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
                      />
                    
                    </label>
                  )
                }
                <button type='submit'  className="mt-6 w-full rounded-[8px] bg-blue-200 py-[12px] px-[12px] font-medium text-white">
                  {
                    !emailSent?
                    "Submit":"Resend Email"
                  }
                </button>
                

                </form>
                <div className='mt-6 flex items-center justify-between'>
                  <Link to='/login'>
                  <p className="flex items-center gap-x-2 text-richblack-900">
                      <BiArrowBack/> Back To Login
                    </p>
                  </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default ForgotPassword
