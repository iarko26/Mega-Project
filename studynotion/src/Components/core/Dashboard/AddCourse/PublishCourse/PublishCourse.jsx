import React, { useEffect } from 'react'
import {COURSE_STATUS} from "../../../../../utils/constants"
import { useForm } from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetCourse,setStep } from '../../../../../redux/slices/Courseslice'
import { editCourseDetails } from '../../../../../Services/operations/courseDetailsAPI'

function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {token}=useSelector((state)=>state.auth)
  const {course}=useSelector((state)=>state.course)
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    if(course?.Status===COURSE_STATUS.PUBLISHED){
      setValue("public",true)
    }
  })

  

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
    <p className="text-2xl font-semibold text-richblack-5">
      Publish Course
    </p>
    <form>
    <div className="my-6 mb-8">
    <label htmlFor="public" className="inline-flex items-center text-lg">
          <input
            type='checkbox'
            id='public'
            {...register('public')}
            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
          />
          <span className="ml-2 text-richblack-400">
              Make this course as public
            </span>
        </label>
      </div>
      <div>

      </div>
    </form>
      
    </div>
  )
}

export default PublishCourse
