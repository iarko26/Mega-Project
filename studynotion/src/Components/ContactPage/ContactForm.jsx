import React, { useEffect, useState } from 'react'
import CountryCode from "../../data/countrycode.json"
import { useForm } from 'react-hook-form';
import {contactUsEndpoints} from "../../Services/apis"
import  {apiconnector} from "../../Services/apiconnector"

function ContactForm() {
  const [loading,setloading]=useState(false);
 const {
  register,
  handleSubmit,
  formState: { errors,isSubmitSuccessful },
  reset

 }=useForm();

 const submitContactForm=async(data)=>{
  console.log("Logging Data",data);
  
  try{
    setloading(true);
    const response=await apiconnector("POST",contactUsEndpoints.CONTACTUS_API,data);
    
    console.log("Logging response",response);
    setloading(false);
    

  }
  catch(error){
    console.log("Error:",error.message);
    setloading(false);

  }
 }
 useEffect(()=>{
  if(isSubmitSuccessful){
    reset({
      firstname:"",
      lastname:"",
      email:"",
      phonenumber:""
    })

  }
 },[reset,isSubmitSuccessful])
 
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-5 lg:flex-row">
         <div className="flex flex-col gap-2 lg:w-[48%]">
         <label htmlFor="firstname" className="lable-style">
            First Name
          </label>
           <input
            name='firstname'
            type='text'
            placeholder='Enter first name'
             className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
             {...register("firstname",{required:true})}
           />
           {
            errors.firstname && 
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
           }
         </div>
         <div className="flex flex-col gap-2 lg:w-[48%]">
         <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
           <input
            name='lastname'
            type='text'
            placeholder='Enter last name'
             className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
            {...register("lastname",{required:true})}
           />
            {
              errors.lastname &&
              <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
            }
         </div>
      </div>
      <div className='flex flex-col gap-2 '>
      <label htmlFor="email" className="lable-style">
            Email
          </label>
           <input
            name='Email'
            type='text'
            placeholder='Enter email address'
            className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
            {...register("email",{required:true})}
           />
           {
            errors.email &&
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your email address.
            </span>
           }

      </div>
      <div className='flex flex-col gap-2'>
      <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>
        <div className='flex gap-5'>
        <div className="flex w-[81px] flex-col gap-2">
           <select 
           name='dropdown'
          id='dropdown'
          className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
          {...register("countrycode",{required:true})}
          >
          
          
            {
              CountryCode.map((data,index)=>{
                return(
                  <option key={index}
                  value={data.code}
                  >
                    {data.code} - {data.country}
                  </option>
                )
              })
            }
          </select>
         



          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input 
            type='text'
            name='phonenumber'
            placeholder='Enter phone number'
            className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
            {
              ...register("phonenumber",
              {
               required:{value:true,message:"Please enter your phone number"},
                minLength:{value:10,message:"Please enter valid phone number"},
               maxLength:{value:10,message:"Please enter valid phone number"} 
              }
             

             
              
              )
            }
            />
            {
              errors.phonenumber &&
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your phone number.
              </span>
            }
            
          </div>
         

        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="message" className="lable-style">
            Message
          </label>
          <textarea 
          name='message'
          placeholder='Enter your message'
          cols="30"
          rows="7"
          id='message'
          className='bg-white rounded-md text-richblack-600 w-full p-[12px]'
          {
            ...register("message",{required:true})
          }
          />
      
          {
            errors.message &&
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your message.
            </span>
          }


          </div>
         
            <button type='submit' className='rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18) mt-3' disabled={loading}>
              Send Message
            </button>

         
          
      </div>
    </form>
  )
}

export default ContactForm
