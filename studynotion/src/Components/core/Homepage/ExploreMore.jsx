import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore'
import HighlightedText from './HighlightedText';
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
const TabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];


function ExploreMore() {
    const [currenttab,setcurrenttab]=useState(TabsName[0]);
    const[courses,setCourses]=useState(HomePageExplore[0].courses);
    const[currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

let setMyCards=(val)=>{
    setcurrenttab(val);
    const result=HomePageExplore.filter((course)=>course.tag===val);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);

}
  return (
    <div >
    <div>
        <div className='text-4xl font-semibold text-center my-10 '>
        Unlock the
        <HighlightedText text={"Power of Code"} />
        <p className='text-lg text-center text-richblack-300  font-semibold mt-1'>
        Learn to Build Anything You Can Imagine
        </p>
        </div>
    
    <div className='hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-white text-richblack-900 font-medium rounded-full p-1 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
    {
        TabsName.map((elem,i)=>{
            return(
                <div key={i} onClick={()=>setMyCards(elem)} className={`text-[16px] flex flex-row items-center gap-2 ${
                currenttab===elem ? "bg-[#FFF0E5] font-medium text-richblack-900":"text-richblack-200"}
                px-7 py-2 rounded-full transition-all duration-200 cursor-pointer hover:bg-[#FFF0E5] hover:text-richblack-900
                `}>

                   {elem}

                </div>
            )
        })
    }
    </div>

    <div className='hidden lg:block lg:h-[200px]'></div>
        <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
            {
                courses.map((elem,i)=>{
                    //course card component
                    return(
                        <div key={i}
                        onClick={()=>setCurrentCard(elem.heading)}
                        currentCard={currentCard}
                         className={`w-[360px] lg:w-[30%] ${
        currentCard === elem.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
          : "bg-richblack-800"
      }  text-richblack-200 h-[300px] box-border cursor-pointer`}

                        >
                    <div className='border-b-[2px] border-blue-200 border-dashed h-[80%] p-6 flex flex-col gap-3'>
                     
                        <div className={`${
                        currentCard === elem.heading && "text-richblack-800"
                        } font-semibold text-[20px]`}>
                           {
                                 elem.heading
                           }
                        </div>
                        <div className="text-richblack-400">
                               {
                                      elem.description
                               }
                        </div>
                        
                      
                      
                        
                    

                    </div>

                    <div className={`flex justify-between ${
                    currentCard===elem.heading ?"text-blue-300" : "text-richblack-300"
                    }  px-6 py-3 font-medium`}>
                        <div className='flex items-center gap-2 text-[16px]'>
                            <HiUsers/>
                            <p>{elem.level}</p>
                        </div>
                        <div className='flex items-center gap-2 text-[16px]'>
                            <ImTree/>
                            <p>{elem.lessionNumber} Lessons</p>
                        </div>
                    </div>
                        </div>
                    )
                    
                })
            }
        </div>
   

        
    </div>
      
    </div>
  )
}

export default ExploreMore
