import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProgressBar from "@ramonak/react-progress-bar";
import { getUSerEnrolledCourses } from '../../../Services/operations/profileAPI';

function EnrolledCourses() {
    const {token}=useSelector((state)=>state.auth)
    
     const [enrolledCourses,setEnrolledCourses]=useState(null)
    async function getEnrolledCourses(){
        try{
            const response=await getUSerEnrolledCourses(token)
            setEnrolledCourses(response)

        }
        catch(error){
            console.log("Unable to Fetch Enrolled Courses")
    
        }

     }
     useEffect(()=>{
        getEnrolledCourses()
     },[])

  return (
    <div>
       <div className="text-3xl text-richblack-900">Enrolled Courses</div>
       {
        !enrolledCourses?
        (<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>)
        :(
            !enrolledCourses.length?
            (
                <p className="grid h-[10vh] w-full place-content-center text-richblack-900">No Courses Found</p>
            )
            :(
                <div className="my-8 text-richblack-900">
                   <div className="flex rounded-t-lg bg-richblack-500 ">
                    <p className="w-[45%] px-5 py-3">Course Name</p>
                    <p className="w-1/4 px-2 py-3">Duration</p>
                    <p className="flex-1 px-2 py-3">Progress</p>
                   </div>
                   {
                    enrolledCourses.map((course,i)=>{
                        <div>
                            <div>
                                <img src={course.thumbnail}
                                    alt={course.courseName}
                                     className="h-14 w-14 rounded-lg object-cover"
                                />
                            </div>
                            <div>
                                {
                                    course?.timeDuration
                                }
                            </div>
                            <div>
                                <p>Progress
                                {
                                    course.progressPercentage || 0
                                }%
                                </p>
                                <ProgressBar 
                                completed={course.progressPercentage || 0}
                                height='8px'
                                isLabelVisible={false}
                                 />
                            </div>
                        </div>
                    })
                   }

                </div>
            )
        )
       }
    </div>
  )
}

export default EnrolledCourses
