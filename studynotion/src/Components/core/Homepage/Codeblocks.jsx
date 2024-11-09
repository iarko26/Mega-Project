import React from 'react'
import CustomButton from './CustomButton'

import { FaArrowRight } from "react-icons/fa"

import { TypeAnimation } from 'react-type-animation'
function Codeblocks({
  position,heading,subheading,custombutton1,custombutton2,codeblock,codecolor,}) {
  return (
    <div className={`flex ${position} justify-between my-20 gap-10 `}>
    <div className='flex flex-col w-[50%] gap-8 '>
      {heading}
      <div className='text-richblack-300 font-bold'>
        {subheading}
      </div>
      <div className='flex gap-7 mt-7 '>
       <CustomButton active={custombutton1.active} linkto={custombutton1.linkto}>
         <div className='flex items-center gap-2'>
           {custombutton1.children}
          <FaArrowRight/>
         </div>

       </CustomButton>
       <CustomButton active={custombutton2.active} linkto={custombutton2.linkto}>
          {custombutton2.children}

       </CustomButton>
      </div>
    </div>
    <div className='h-fit  flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px] bg-white' >
        
     <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
     </div>
     <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codecolor} pr-1`}>
      <TypeAnimation
        sequence={[codeblock,2000,""]}
        repeat={Infinity}
        cursor={true}
        style={{
          whiteSpace: "pre-line",
                    display:"block",
        }}
        omitDeletionAnimation={true}
        
      />
    </div>
 
                
    </div>
    
      
    </div>
  )
}

export default Codeblocks
