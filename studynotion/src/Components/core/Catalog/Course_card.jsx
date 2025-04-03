import React, { useEffect, useState } from 'react'
import GetAvgRating from '../../../utils/avgRating'
import RatingStars from '../../common/RatingStars'
import { Link } from 'react-router-dom'
function Course_card({course,Height}) {
    const [avgRating,setavgRating]=useState(0)
    useEffect(()=>{
        const count=GetAvgRating(course.ratingandreviews)
        setavgRating(count)

    },[course])
  return (
    <div>
      <Link to={`/courses/${course._id}`}>
         <div className=''>
          <div className='rounded-lg'>
            <img
                src={course?.thumbnail}
                alt='course thumnail'
                className={`${Height} w-full rounded-xl object-cover `}

            />

          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
           <p className="text-xl text-richblack-900">
            {course?.courseName}
           </p>
           <p className="text-sm text-richblack-500">
            
                {course?.instructor?.firstname} {course?.instructor?.lastname}
            
           </p>
           <div className="flex items-center gap-2">
              <span className="text-yellow-900">
                 {avgRating || 0}
              </span>
              <RatingStars Review_Count={avgRating}  />
              <span className="text-richblack-500">
                 {course?.ratingandreviews?.length} Ratings
              </span>
           </div>
           <p className="text-xl text-richblack-900">USD. {course?.price}</p>
          </div>

         </div>
      </Link>
    </div>
  )
}

export default Course_card
