import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setSignupdata } from '../../../redux/slices/Authslice';
import { sendOtp } from '../../../Services/operations/authAPI';
import { ACCOUNT_TYPE } from '../../../utils/constants';

function SignupForm() {
 const navigate=useNavigate();
 const dispatch=useDispatch();

  const [accountType,setAccountType]=useState(ACCOUNT_TYPE.STUDENT)

  const [formData,setFormData]=useState({
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    confirmpassword:''

  })
  const [showpass,setshowpass]=useState(false);
  const [showconpass,setconpass]=useState(false);
  const{firstname,lastname,email,password,confirmpassword}=formData;
  let changehandler=(e)=>{
    setFormData((prevdata)=>({
      ...prevdata,
      [e.target.name]:e.target.value
    }))

  }
  const tabs=[
    {
      id:1,
      tabname:'Student',
      type:ACCOUNT_TYPE.STUDENT
    },
    {
      id:2,
      tabname:"Instructor",
      type:ACCOUNT_TYPE.INSTRUCTOR
    }
  ]
  let handleOnSubmit=(e)=>{
    e.preventDefault();
    if(password!==confirmpassword){
      toast.error('Passwords Do Not Match')
      return
    }
    const signupData={
      ...formData,
      accountType
    }
    dispatch(setSignupdata(signupData))
    dispatch(sendOtp(formData.email,navigate))
    setFormData({
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      confirmpassword:''
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }



  return (
    <div>
      <div className='flex bg-white  p-2 gap-x-1 my-6 rounded-full max-w-max'>
       {
        tabs.map((tab)=>{
          return(
            <div
            key={tab.id}
            onClick={()=>setAccountType(tab.type)}
            className={`cursor-pointer ${accountType===tab.type?'bg-blue-200 text-white font-bold':'text-richblack-900'} rounded-full px-3 py-2 duration-200 transition-all`}
            >
              {
                tab.tabname
              }
            </div>
          )
        })
       }


      </div>
  
      <form className='w-full flex flex-col mt-6 gap-y-4 ' onSubmit={handleOnSubmit}>
       <div className='flex gap-x-4'>
          <label>
             <p className='text-richblack-900 mb-1 font-bold text-sm leading-[1.375rem] '>
                First Name <sup className='text-blue-200'>*</sup>
             </p>
             <input type='text' name='firstname' placeholder='Enter first name' onChange={changehandler} value={firstname}
              className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
             />
          </label>
          <label>
             <p className='text-richblack-900 mb-1 font-bold text-sm leading-[1.375rem] '>
                Last Name <sup className='text-blue-200'>*</sup>
             </p>
             <input type='text' name='lastname' placeholder='Enter last name' onChange={changehandler} value={lastname}
              className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
             />
          </label>
       </div>
        <label className='w-full'>
          <p className='text-richblack-900 mb-1 font-bold text-sm leading-[1.375rem] '>
            Email Address <sup className='text-blue-200'>*</sup>
          </p>
          <input type='text' name='email' placeholder='Enter email address'
            onChange={changehandler} value={email}
            className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
          />
        </label>
        <div className='flex gap-x-4'>
          <label className='relative'>
          <p className='text-richblack-900 mb-1 font-bold text-sm leading-[1.375rem] '>Password <sup className='text-blue-200'>*</sup></p>
             
              <input 
              type={showpass?'text':'password'} 
              name='password' 
              placeholder='Enter password' 
              onChange={changehandler} value={password}
             
              className="w-full rounded-md bg-white p-[12px] pr-10 text-richblack-600"/>
              <span onClick={()=>setshowpass(prev=>!prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
               {
                showpass?
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />:<AiOutlineEye fontSize={24} fill="#AFB2BF" />
                
               } 
              </span>

          </label>
          <label className='relative'>
          <p className='text-richblack-900 mb-1 font-bold text-sm leading-[1.375rem] '>Confirm Password <sup className='text-blue-200'>*</sup></p>
          <input 
          type={showconpass?'text':'password'}
          name='confirmpassword' 
          placeholder='Enter Confirm password' 
          onChange={changehandler} value={confirmpassword}
          className="w-full rounded-md bg-white p-[12px] pr-10 text-richblack-600"/>
             <span onClick={()=>setconpass(prev=>!prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
               {
                showconpass?
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />:<AiOutlineEye fontSize={24} fill="#AFB2BF" />
                
               } 
              </span>
          </label>
       </div>
        <button type='submit' className='bg-blue-200 text-white font-medium mt-6 rounded-[8px]  py-[8px] px-[12px] '>
          Sign Up
        </button>

      

      </form>
    </div>
  )
}

export default SignupForm
