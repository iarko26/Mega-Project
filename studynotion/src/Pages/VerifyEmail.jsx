import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { sendOtp,signUp } from '../Services/operations/authAPI';
function VerifyEmail() {
  const[otp,setotp]=useState('');
  const {signupuserData,loading}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    if(!signupuserData){
      navigate('/signup')
    }


  },[])

   let handleVerifyAndSignup=(e)=>{
    e.preventDefault();
    const{
      accountType,
      firstname,
      lastname,
      email,
      password,
      confirmPassword,

    }=signupuserData
    console.log(signupuserData);
    console.log(otp);

    dispatch(signUp(accountType,
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      otp,
      navigate))
   }
  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
       {
        loading?
        (
          <div>
          <div className="spinner"></div>
        </div>
        ):(
          <div>
            <h1>Verify Email</h1>
            <p>  A verification code has been sent to you. Enter the code below</p>
            <form onSubmit={handleVerifyAndSignup}>
              <OTPInput
                value={otp}
                onChange={setotp}
                numInputs={6}
                renderInput={(props)=>(
                  <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />

                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />
              <button type='submit' 
              className='mt-6 w-full rounded-[8px] bg-blue-200 py-[12px] px-[12px] font-medium text-white'>
           
                Verify Email
              </button>
            </form>
            <div className='mt-6 flex items-center justify-between'>
              <Link to='/signup'>
                <p className='text-richblack-200 flex items-center gap-x-2'>
                  <BiArrowBack/> Back To Signup
                </p>
              </Link>

              <button 
              className="flex items-center text-blue-200 gap-x-2"
              onClick={()=>dispatch(sendOtp(signupuserData.email))}>
                <RxCountdownTimer/>
                Resend it
              </button>
            </div>
          </div>

        )
       }
      
    </div>
  )
}

export default VerifyEmail
