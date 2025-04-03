import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../Services/operations/courseDetailsAPI'
import { VscAdd } from "react-icons/vsc"
import CourseTable from './InstructorCourses/CourseTable'

function MyCourses() {
    const {token}=useSelector((state)=>state.auth)
    const [courses,setCourses]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
      const fetchCourses=async()=>{
        const result=await fetchInstructorCourses(token)
        if(result){
            setCourses(result)
        }
      }
        fetchCourses()
    },[])


  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
      <h1 className="text-3xl font-medium text-richblack-900">My Courses</h1>
        <button onClick={()=>navigate("/dashboard/add-course")} className="cursor-pointer rounded-lg bg-blue-200 py-[8px] px-[20px] font-semibold text-white flex items-center gap-1">
            <VscAdd/>
            Add
        </button>
      </div>
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
      
    </div>
  )
}

export default MyCourses
