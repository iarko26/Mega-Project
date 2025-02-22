import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
export default function RequirementField ({
name,
label,
register,
setValue,
errors,
getValues,
}){
 const [requirement,setRequirement]=useState([])
 const [requirementList,setRequirementList]=useState([])
 const {course,editCourse}=useSelector((state)=>state.course)
useEffect(()=>{
    if(editCourse){
        setRequirementList(course?.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
},[])
useEffect(()=>{
setValue(name,requirementList)
},[requirementList])
 const handleAddRequirement=()=>{
    if(requirement){
        setRequirementList([...requirementList,requirement])
        setRequirement('')
    }
 }
 const handleRemoveRequirement=(index)=>{
const updatedRequirements=[...requirementList]
updatedRequirements.splice(index,1)
setRequirementList(updatedRequirements)
 } 

 return(
    <div className='flex flex-col space-y-2'>
     <label className='text-sm text-richblack-900' htmlFor={name}>
     {label} <sup className='text-blue-200'>*</sup>
     </label>
     <div className="flex flex-col items-start space-y-2">
         <input
         type='text'
         id={name}
         value={requirement}
         onChange={(e)=>setRequirement(e.target.value)}
         className="w-full p-2 border-[1px] border-richblack-700 rounded-md"
          />
          <button type='button' className='font-semibold text-richblack-900' onClick={handleAddRequirement}>
             Add
          </button>

     </div>
     {
        requirementList.length>0 && (
            <ul className='mt-2 list-disc list-inside'>
             {
                requirementList.map((requirement,index)=>{
                    return(
                        <li key={index} className='flex items-center text-richblack-900'>
                        <span>{requirement}</span>
                        <button type='button'
                        onClick={()=>handleRemoveRequirement(index)} className='ml-2 text-red-500'>
                            Remove
                        </button>

                        </li>
                    )
                })
             }
                 
            </ul>
        )
     }
     {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}


    </div>
 )
 

}
