import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../Services/operations/courseDetailsAPI'
import GetAvgRating from '../utils/avgRating'

function CourseDetails() {
   const {user}=useSelector((state)=>state.profile)
   const {token}=useSelector((state)=>state.auth)
   const {loading}=useSelector((state)=>state.profile)
   const {paymentLoading}=useSelector((state)=>state.course)
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const {courseId}=useParams()
   const [response,setResponse]=useState(null)
   const [confirmationModal,setConfirmationModal]=useState(null)
   const [avgReviewCount,setAvgReviewCount]=useState(0)
   const [isActive,setIsActive]=useState(Array(0))

   useEffect(()=>{
      const getCourseDetails=async()=>{
        try{
            const res=await fetchCourseDetails(courseId)
            setResponse(res)

        }
        catch(error){
            console.log("Could not fetch Course Details")

        }
      }
        getCourseDetails()

   },[courseId])
   

   useEffect(()=>{
    const count=GetAvgRating(response?.data?.CourseDetails.ratingandreviews)
    setAvgReviewCount(count)
   },[response])

   const handleActive=()=>{
    
   }




   
  return (
    <div className='relative w-full bg-white '>
      <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
         <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
         <div className="relative block max-h-[30rem] lg:hidden">
               <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              
             </div>
         </div>
      </div>
        
      
    </div>
  )
}

export default CourseDetails
