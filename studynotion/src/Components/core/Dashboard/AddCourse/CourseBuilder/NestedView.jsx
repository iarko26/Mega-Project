import React, { useState } from 'react'
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { deleteSection,deleteSubSection } from '../../../../../Services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../redux/slices/Courseslice'
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { useDispatch, useSelector } from 'react-redux'
function NestedView({handleChangeEditSectionName}) {
const {course}=useSelector((state)=>state.course)
const {token}=useSelector((state)=>state.auth)
const [addSubSection,setAddSubsection]=useState(null)
const [viewSubSection,setViewSubSection]=useState(null)
const [editSubSection,setEditSubSection]=useState(null)
const [confirmationModal,setConfirmationModal]=useState(null)
const dispatch=useDispatch()

const handleDeleteSection=async(sectionId)=>{
  const result=await deleteSection({
    sectionId,
    courseId:course._id,
    token
  })
  if(result){
    dispatch(setCourse(result))
  }
  setConfirmationModal(null)


}
const handleDeleteSubSection=async(subsectionId,sectionId)=>{
  const result=await deleteSubSection({subsectionId,sectionId,token})
 if(result){
  const updatedCourseContent=course.courseContent.map((section)=>{
    section._id===sectionId?result:section
  })
  const updatedCourse={...course,courseContent:updatedCourseContent}
  dispatch(setCourse(updatedCourse))
 }
setConfirmationModal(null)
}
  return (
    <div>
      <div className='rounded-lg p-6 px-8 bg-richblack-700' id="nestedViewContainer">
        {
          course?.courseContent?.map((section)=>{
            return(
              <details key={section._id} open>
                <summary  className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                    <div className="flex items-center gap-x-3">
                       <RxDropdownMenu className="text-2xl text-richblack-50"/>
                       <p className="font-semibold text-richblack-50"> 
                        {
                          section.sectionName
                        }
                       </p>
                       <button
                       onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)}
                       


                       >
                         <MdEdit className="text-xl text-richblack-300"/>
                       </button>
                       <button
                      onClick={()=>setConfirmationModal({
                        text1:"Delete Section?",
                        text2:"Are you sure you want to delete this section?",
                        btn1Text:"Yes",
                        btn2Text:"No",
                        btn1Handler:()=>handleDeleteSection(section._id),
                        btn2Handler:()=>setConfirmationModal(null),


                      })}
                       >
                       <RiDeleteBin6Line className="text-xl text-richblack-300"/>

                       </button>
                       <span className="font-medium text-richblack-300">|</span>
                       <AiFillCaretDown className="text-xl text-richblack-300"/>
                    </div>
                </summary>
                <div className="px-6 pb-4">
                   {
                    section.subSection.map((data)=>{
                      <div key={data?._id} onClick={()=>setViewSubSection(data)}
                      className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                      >
                      <div className="flex items-center gap-x-3 py-2 ">
                      <RxDropdownMenu className="text-2xl text-richblack-50"/>
                      <p className="font-semibold text-richblack-50">
                      {
                        data.title
                      }

                      </p>

                      </div>
                      <div className="flex items-center gap-x-3" >
                        <button
                        
                        onClick={()=>setEditSubSection({...data,sectionId:section._id})}
                        >
                        <MdEdit className="text-xl text-richblack-300"/>
                           
                        </button>
                        <button
                          onClick={()=>
                          setConfirmationModal({
                            text1:"Delete SubSection?",
                            text2:"Are you sure you want to delete this SubSection?",
                            btn1Text:"Yes",
                            btn2Text:"No",
                            btn1Handler:()=>handleDeleteSubSection(data._id,section._id),
                            btn2Handler:()=>setConfirmationModal(null),
                          })
                          }
                        
                        >
              
                          <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                        </button>
                      </div>
                         

                      </div>
                      
                    })
                   }
                   <button
                   onClick={()=>setAddSubsection(section._id)}
                  className="mt-3 flex items-center gap-x-1 text-yellow-50"
                   >
                       <FaPlus className="text-lg" />
                       <p>Add Lecture</p>

                   </button>
                </div>
                 
              </details>

            )
             
          })
          
        }
      </div>
    </div>
  )
}

export default NestedView
