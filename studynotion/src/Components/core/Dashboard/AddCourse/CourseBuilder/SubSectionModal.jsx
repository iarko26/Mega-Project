import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createSubSection, updateSubSection } from '../../../../../Services/operations/courseDetailsAPI';
import { RxCross2 } from "react-icons/rx";
import { setCourse } from '../../../../../redux/slices/Courseslice';
import Upload from '../Upload';

function SubSectionModal({ modaldata, setModalData, add = false, view = false, edit = false }) {
  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    if (view || edit) {
      setValue('lectureTitle', modaldata.title);
      setValue('lectureDesc', modaldata.description);
      setValue('lectureVideo', modaldata.videoUrl);
    }
  }, [view, edit, modaldata, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modaldata.title ||
      currentValues.lectureDesc !== modaldata.description ||
      currentValues.lectureVideo !== modaldata.videoUrl
    );
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append('sectionId', modaldata.sectionId);
    formData.append('subSectionId', modaldata._id);

    if (currentValues.lectureTitle !== modaldata.title) {
      formData.append('title', currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modaldata.description) {
      formData.append('description', currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modaldata.videoUrl) {
      formData.append('video', currentValues.lectureVideo); // Fixed: 'vidoe' to 'video'
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modaldata.sectionId
          ? result
          : section
      );

      const updatedCourse={...course,courseContent:updatedCourseContent}
      dispatch(setCourse(updatedCourse));
    } 
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) {
      return;
    }
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
        return;
      }
      handleEditSubSection();
      return;
    }

    const formData = new FormData();
    // Fix for add mode - check if modaldata is just an ID string or an object
    const sectionId = typeof modaldata === 'string' ? modaldata : modaldata.sectionId;
    
    formData.append('sectionId', sectionId);
    formData.append('title', data.lectureTitle);
    formData.append('description', data.lectureDesc);
    formData.append('video', data.lectureVideo); // Fixed: 'vidoe' to 'video'

    console.log('Form Data:', {
      sectionId: sectionId,
      title: data.lectureTitle,
      description: data.lectureDesc,
      video: data.lectureVideo, // Fixed: 'vidoe' to 'video'
    });

    setLoading(true);
    const result = await createSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId
          ? result
          : section
      );
      const updatedCourse={...course,courseContent:updatedCourseContent}
      dispatch(setCourse(updatedCourse));
    } 
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {edit && "Editing"} {add && "Adding"} Subsection
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modaldata.videoUrl : null}
            editData={edit ? modaldata.videoUrl : null}
          />
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              id='lectureTitle'
              placeholder='Enter Lecture Title'
              {...register('lectureTitle', { required: true })}
              className='px-3 py-2 border border-richblack-500 rounded-md bg-richblack-700 text-richblack-50'
              disabled={loading || view}
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className='text-sm text-richblack-5' htmlFor='lectureDesc'>
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              id='lectureDesc'
              placeholder='Enter Lecture Description'
              {...register('lectureDesc', { required: true })}
              className='px-3 py-2 border border-richblack-500 rounded-md bg-richblack-700 text-richblack-50'
              disabled={loading || view}
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <button
                className='px-4 py-2 bg-blue-200 text-richblack-900 rounded-md'
                type='submit'
                disabled={loading}
              >
                {loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SubSectionModal;