import React from 'react'
import { useSelector } from 'react-redux'

function CourseBuilderForm() {
  const {setCourse,setStep,setEditCourse}=useSelector((state)=>state.course);
  
  return (
    <div>
      
    </div>
  )
}

export default CourseBuilderForm
