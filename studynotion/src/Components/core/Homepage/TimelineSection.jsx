import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"
function TimelineSection() {
    const timeline=[
        {
            Logo:Logo1,
            heading:"Leadership",
            description:"Fully committed to the success company"
        },
        {
            Logo:Logo2,
            heading:"Responsibility",
            description:"Students will always be our top priority"
        },
        {
            Logo:Logo3,
            heading:"Flexibility",
            description:"The ability to switch is an important skills"
        },
        {
            Logo:Logo4,
            heading:"Solve the problem",
            description:"Code your way to a solution"
        }
    ];
  return (
    <div>
       <div className='flex flex-col lg:flex-row gap-20 mb-20 items-center'>
        <div className='lg:w-[45%] flex flex-col gap-14'>
           {
            timeline.map((elem,index)=>{
                return(
                    <div className='flex flex-row gap-6 ' key={index}>
                       <div className='w-[52px] h-[52px] bg-[#FFF0E5] flex items-center justify-center rounded-full'>
                          <img src={elem.Logo}/>
                          
                       </div>
                       
                       <div>
                            <h2 className='font-semibold text-[18px]'>{elem.heading}</h2>
                            <p className='text-base'>{elem.description}</p>
                       </div>

                     

                    </div>
                )
            })
           }
            
        </div>
        <div className='relative shadow-[10px_-5px_50px_-5px] shadow-richblack-900'>
          <img src={timelineImage} alt="timelineImage"
            className='shadow-[20px_20px_rgba(255,255,255)] object-cover h-fit'
          />
         <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                          left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div className='bg-caribbeangreen-700 flex flex-row gap-5 items-center  px-7 border-r border-caribbeangreen-300'>
                <p className='text-3xl font-bold '>10</p>
                <p className='text-caribbeangreen-300 text-sm' >Years Of Experiences</p>
            </div>

            <div className=' flex gap-5 items-center px-7'>
            <p className='text-3xl font-bold '>250</p>
            <p className='text-caribbeangreen-300 text-sm'>Types Of Courses</p>

            </div>
           <div>
                
           </div>

         </div>

        </div>
       </div>
      
    </div>
  )
}

export default TimelineSection
