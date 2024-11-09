import React from 'react'

import { Link } from 'react-router-dom';

function CustomButton({children,linkto,active}) {
  return (
    <div>
     <Link to={linkto}>
     <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold  cursor-pointer
        ${active ? "bg-blue-200 text-white":" bg-white text-richblack-900"}
        hover:scale-95 transition-all duration-200 shadow-lg
        `}>
            {children}
        </div>

   </Link>
      
    </div>
  )
}

export default CustomButton
