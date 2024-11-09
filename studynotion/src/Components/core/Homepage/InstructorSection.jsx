import React from 'react'
import CustomButton from './CustomButton'
import HighlightedText from './HighlightedText'
import Instructor from "../../../assets/Images/Instructor.png"
import { FaArrowRight } from 'react-icons/fa'
function InstructorSection() {
  return (
    <div className='mt-16'>
      <div className='flex flex-row items-center gap-20'>
        <div className='w-[50%] shadow-[10px_-5px_50px_-5px] '>
            <img src={Instructor} className='shadow-[20px_20px_rgba(255,255,255)]'/>

        </div>
        <div className=' w-[50%] flex flex-col gap-10'>
            <div className='text-4xl font-semibold w-[50%]'>
                Become an
                <HighlightedText text={"Instructor"} />
            </div>
            <p className='text-richblack-300 font-medium text-[16px] w-[85%]'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>
            <div className='w-fit'>
                <CustomButton active={true}
                linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Learning Today
                        <FaArrowRight />
                    </div>
                </CustomButton>
            </div>
        </div>

      </div>
    </div>
  )
}

export default InstructorSection
