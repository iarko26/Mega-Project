import React, { useEffect, useState } from 'react'
import { setCourse,setEditCourse } from '../../../../redux/slices/Courseslice'
import RenderSteps from '../AddCourse/RenderSteps'
import { useDispatch, useSelector } from 'react-redux'
import { getFullDetailsOfCourse } from '../../../../Services/operations/courseDetailsAPI'
import { useParams } from 'react-router-dom'
function EditCourse() {
  const { courseId } = useParams(); // Extract courseId from the route
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const populatedCourseDetails = async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token); // Use courseId here
      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }
      setLoading(false);
    };
    populatedCourseDetails();
  }, [courseId, token, dispatch]);

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-900">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-900">
            Course not found
          </p>
        )}
      </div>
    </div>
  );
}

export default EditCourse;
