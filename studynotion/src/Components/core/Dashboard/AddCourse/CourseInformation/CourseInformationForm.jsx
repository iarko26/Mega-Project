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
import { setCourse, setStep } from '../../../../../redux/slices/Courseslice';
import Upload from '../Upload';
import RequirementField from './RequirementField';
function CourseInformationForm() {

  const {
    setValue,
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  }=useForm();
  const {token}=useSelector((state)=>state.auth)
  const {course,editCourse}=useSelector((state)=>state.course);
  const [loading,setLoading]=useState(false);
  const [courseCategories, setCourseCategories] = useState([])
  const dispatch=useDispatch();
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


const isFormUpdated=()=>{
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

const onSubmit=async(data)=>{
   
  if(editCourse){
    if(isFormUpdated()){
      const currentValues=getValues();
      const formData=new FormData();
      formData.append("courseId",course._id)
      if(currentValues.courseTitle!==course.courseName){
        formData.append("courseName",data.courseTitle)
      }
      if(currentValues.courseShortDesc!==course.courseDescription){
        formData.append("courseDescription",data.courseShortDesc)
      }
      if(currentValues.coursePrice!==course.price){
        formData.append("price",data.coursePrice)
      }
      if(currentValues.courseTags.toString()!==course.tags.toString()){
        formData.append("tags",JSON.stringify(data.courseTags))
      }
      if(currentValues.courseBenefits!==course.whatwillyoulearn){
        formData.append("whatwillyoulearn",data.courseBenefits)
      }
      if(currentValues.courseCategory._id!==course.category._id){
        formData.append("category",data.courseCategory)
      }
      if(currentValues.courseRequirements.toString()!==course.instructions.toString()){
        formData.append("instructions",JSON.stringify(data.courseRequirements))
      }
      if(currentValues.courseImage!==course.thumbnail){
        formData.append("thumbnail",data.courseImage)
      }
      setLoading(true)
      const result=await editCourseDetails(formData,token);
      if(result){
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }
      else{
        toast.error("Could not update course details")
      }
      return



    }
  }
  const formData=new FormData();
  formData.append("courseName", data.courseTitle);
  formData.append("courseDescription", data.courseShortDesc);
  formData.append("price", data.coursePrice);
  formData.append("whatwillyoulearn", data.courseBenefits);
  formData.append("category", data.courseCategory);
  formData.append("Status", COURSE_STATUS.DRAFT);
  
  // Convert arrays to JSON strings before appending
  formData.append("tags", JSON.stringify(data.courseTags || []));
  formData.append("instructions", JSON.stringify(data.courseRequirements || []));
  
  // Append the file last
  if (data.courseImage) {
      formData.append("thumbnailImg", data.courseImage);
  }
  
  setLoading(true);
  try {
    const result = await addCourseDetails(formData, token);
    if (result) {
        dispatch(setStep(2));
        dispatch(setCourse(result));
    }
} catch (error) {
    console.error("Course creation error:", error);
    toast.error("Failed to create course");
}
setLoading(false);

}





  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
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
            !loading && courseCategories?.map((category,index)=>{
              return(
                <option key={index} value={category?._id}>
                   {category?.name}
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
      <Upload
       name="courseImage"
       label="Course Image"
       register={register}
       setValue={setValue}
       errors={errors}
       editData={editCourse?course?.thumbnail:null}


      />
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-900" htmlFor="courseBenefits">
        Benefits of the course  <sup className="text-blue-200">*</sup>
        </label>
         <textarea
          id='courseBenefits'
          placeholder='Enter Benefits of the course'
          {...register("courseBenefits",{required:true})}
          className='w-full p-2 border-[1px] border-richblack-700 rounded-md'
         />
         {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-blue-200">
            Benefits of the course is required
          </span>
        )}
         
      </div>
      <RequirementField
      name="courseRequirements"
      label="Requirements/Instructions"
      register={register}
      setValue={setValue}
      errors={errors}
      getValues={getValues}
      />
      <div className="flex justify-end gap-x-2">
          {
            editCourse && (
              <button onClick={()=>dispatch(setStep(2))}
              disabled={loading}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                  Continue Wihout Saving

              </button>
            )
          }
          <button type='submit'  className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`} disabled={loading}>
            {!editCourse ? "Next" : "Save Changes"}
             <MdNavigateNext className="text-3xl text-richblack-900" />
          </button>
          
      </div>

    </form>
  )
}

export default CourseInformationForm
