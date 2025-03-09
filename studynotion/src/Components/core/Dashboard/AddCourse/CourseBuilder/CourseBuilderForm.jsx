import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {MdAddCircleOutline} from "react-icons/md"
import NestedView from './NestedView';
import { setCourse, setEditCourse,setStep } from '../../../../../redux/slices/Courseslice';
import { toast } from 'react-toastify';
import { updateSection,createSection } from '../../../../../Services/operations/courseDetailsAPI';
function CourseBuilderForm() {
  const {register, handleSubmit, setValue, formState:{errors} } = useForm();
  const {course}=useSelector((state)=>state.course)
  const {token}=useSelector((state)=>state.auth)

  const dispatch=useDispatch();
  const [editSectionName,seteditSectionName]=useState(null)
  const [loading,setLoading]=useState(false)
const onSubmit=async(data)=>{
  setLoading(true)
  let result
  if(editSectionName){
    result=await updateSection({
      sectionName:data.sectionName,
      sectionId:editSectionName,
      courseId:course._id
    },token)

  }
  else{
    result=await createSection({
      sectionName:data.sectionName,
      courseId:course._id
    },token)
  }
 //update value
 if(result){
  dispatch(setCourse(result))
  seteditSectionName(null)
  setValue("sectionName",'')
 }
setLoading(false)
}

const  cancelEdit=()=>{
  seteditSectionName(null)
  setValue("sectionName",'')
}
const handleChangeEditSectionName=(sectionId,sectionName)=>{
  if(editSectionName===sectionId){
     cancelEdit()
      return
  }
  seteditSectionName(sectionId)
  setValue("sectionName",sectionName)
}


const  goBack=()=>{
  dispatch(setStep(1))
  dispatch(setEditCourse(true))

}
const goToNext=()=>{
  if(course.courseContent.length===0){
    toast.error("Please add atleast one section")
    return
  }
  if(course.courseContent.some((section)=>section.Subsection.length===0)){
    toast.error("Please add atleast one subsection in each section")
    return
  }
  dispatch(setStep(3))
}
  return (
    <div className='text-richblack-900'>
     <p className="text-2xl font-semibold text-richblack-900">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
        <label htmlFor='sectionName' className="text-sm text-richblack-900">Section name <sup>*</sup></label>
           <input
             id='sectionName'
             type='text'
             {...register('sectionName', { required: true })}
              className="w-full p-2 border-[1px] border-richblack-700 rounded-md"
           />
           {errors.sectionName && (
            <span>Section Name is required</span>
          )}
        </div>
        <div className='mt-10 flex w-full'>
           <button type='submit'  className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`} >
                       {editSectionName ? "Edit" : "Create Section"}
                        <MdAddCircleOutline className="text-3xl text-richblack-900" />
            </button>
            {
              editSectionName && (
                <button type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline ml-10'>
                  Cancel
                </button>
              )
            }


        </div>
      </form>
      {
            course.courseContent.length>0 &&
        (
         <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }
      <div className="flex justify-end gap-x-3 mt-6">
         <button onClick={goBack}         
        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
         >
            Back
         </button>
         <button onClick={goToNext}
                 disabled={loading}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
               Next 
         </button>
         
          
      </div>
    </div>
  )
}

export default CourseBuilderForm
