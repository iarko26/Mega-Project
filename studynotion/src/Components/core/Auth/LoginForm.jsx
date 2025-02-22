import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link,useNavigate } from 'react-router-dom'
import { Login } from '../../../Services/operations/authAPI';
import { useDispatch } from 'react-redux';

function LoginForm() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [showpass,setshowpass]=useState(false);
  const [formData,setFormData]=useState({
    email:"",
    password:""

  })
  const{email,password}=formData;
  let changehandler=(e)=>{
    setFormData((prevdata)=>({
      ...prevdata,
      [e.target.name]:e.target.value
    }))
  }
  let handleOnSubmit=(e)=>{
    e.preventDefault();
    dispatch(Login(email,password,navigate))

  }

  return (
    <div>
   
    <form className='w-full flex flex-col mt-6 gap-y-4 ' onSubmit={handleOnSubmit}>
    
    <label className='w-full>'
    >
      <p className='text-richblack-900 mb-1 font-bold text-sm leading-[1.375rem] '
    
      >Email <sup className='text-blue-200'>*</sup></p>
      <input type='text' name='email' placeholder='Enter email address'
    
      value={email}
      onChange={changehandler}
       className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
      />
    </label>
    <label className='relative'>
    <p className='text-richblack-900 mb-1 font-bold text-sm leading-[1.375rem] '
   
 
    >Password <sup className='text-blue-200'>*</sup></p>
      <input type={
        showpass?'text':'password'
      } name='password' placeholder='Enter password' className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
           value={password}
           onChange={changehandler}
      />
      <span onClick={()=>setshowpass(prev=>!prev)} className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
      {
        showpass?
        <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />:<AiOutlineEye fontSize={24} fill='#AFB2BF' />

      }
      </span>
      <Link to='/forgot-password'>
      <p className="mt-1 ml-auto max-w-max text-xs text-blue-200 font-semibold">
            Forgot Password?
          </p>
      </Link>
    </label>
    <button type='submit' className='bg-blue-200 text-white font-medium mt-6 rounded-[8px]  py-[8px] px-[12px] '>
      Sign In
    </button>
  </form>
    </div>
    
  )
}

export default LoginForm
