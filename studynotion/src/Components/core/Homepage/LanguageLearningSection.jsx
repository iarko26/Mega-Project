import React from 'react'
import HighlightedText from './HighlightedText'
import know_your_progress  from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import  CustomButton from './CustomButton'
function LanguageLearningSection() {
  return (
    <div className='mt-[130px] mb-32'>
    <div className='flex flex-col items-center gap-5'>
       <div className='text-center text-4xl font-semibold'>
       Your swiss knife for
       <HighlightedText text={"learning any language"} />

       </div>
       <div className='text-richblack-600 text-center w-[70%] text-base mx-auto '>
       Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
       </div>
       <div className='flex flex-row items-center justify-center mt-4'>
        <img src={know_your_progress} className='object-contain -mr-32'/>
        <img src={compare_with_others} className='object-contain'/>
        <img src={plan_your_lesson} className='object-contain -ml-36'/>
       </div>

        <div>
          <CustomButton active={true} linkto={"/signup"}>
            <div>
              Learn more
            </div>
          </CustomButton>
        </div>

     

    </div>
      
    </div>
  )
}

export default LanguageLearningSection
