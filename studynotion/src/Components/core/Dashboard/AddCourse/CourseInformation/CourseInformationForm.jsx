import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { addCourseDetails,editCourseDetails,fetchCourseCategories } from '../../../../../Services/operations/courseDetailsAPI';
import { MdNavigateNext } from "react-icons/md"
import { FaDollarSign } from "react-icons/fa";
import { useForm } from 'react-hook-form';

import ChipInput from './ChipInput';
import { COURSE_STATUS } from '../../../../../utils/constants';
function CourseInformationForm() {
      const {token}=useSelector((state)=>state.auth)
  const {course,editCourse}=useSelector((state)=>state.course);
  const [loading,setLoading]=useState(false);
  const [courseCategories, setCourseCategories] = useState([])
  const dispatch=useDispatch();
  const {
    setValue,
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  }=useForm();
useEffect(()=>{
  const getCategories=async()=>{
    setLoading(true)
    const categories=await fetchCourseCategories();
    if(categories.length>0){
      setCourseCategories(categories)
    }
    setLoading(false)
  }

  if(editCourse){
       setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tags)
      setValue("courseBenefits", course.whatwillyoulearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
  }

  getCategories();

},[])


function isFormUpdated(){
  const currentValues=getValues();
  if( currentValues.courseTitle !== course.courseName ||
    currentValues.courseShortDesc !== course.courseDescription ||
    currentValues.coursePrice !== course.price ||
    currentValues.courseTags.toString() !== course.tags.toString() ||
    currentValues.courseBenefits !== course.whatwillyoulearn ||
    currentValues.courseCategory._id !== course.category._id ||
    currentValues.courseRequirements.toString() !==
      course.instructions.toString() ||
    currentValues.courseImage !== course.thumbnail)
    {
      return true;
    }
    return false;
}



  return (
    <form
    className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-white p-6"
    >
       <div className="flex flex-col space-y-2">
       <label className="text-sm text-richblack-900" htmlFor="courseTitle">
          Course Title <sup className="text-blue-200">*</sup>
        </label>
         <input 
         id="courseTitle"
         placeholder="Enter Course Title"
          className="w-full p-2 border-[1px] border-richblack-700 rounded-md"
          {...register("courseTitle",{required:true})}
          />

       {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-blue-200">
            Course title is required
          </span>
        )}
          
      </div>
      <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-900" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-blue-200">*</sup>
        </label>
          <textarea 
          id="courseShortDesc"
          placeholder="Enter Course Short Description"
            className="w-full p-2 border-[1px] border-richblack-700 rounded-md"
            {...register("courseShortDesc",{required:true})}
            />
      {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-blue-200">
            Course short description is required
          </span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-900" htmlFor="coursePrice">
          Course Price <sup className="text-blue-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <FaDollarSign className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
       <label className="text-sm text-richblack-900"     htmlFor="courseCategory">
          Course Category <sup className="text-blue-200">*</sup>
        </label>
        <select
         {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="w-full p-2 border-[1px] border-richblack-700 rounded-md"
        >
        <option value="" disabled>
            Choose a Category
          </option>
          {
            courseCategories.map((category,i)=>{
              return(
                <option key={i} value={category?._id}>
                  {
                    category?.name
                  }
                </option>
              )
            })
          }
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-blue-200">
            Course Category is required
          </span>
        )}
      </div>
      <ChipInput
      label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

    </form>
  )
}

export default CourseInformationForm
