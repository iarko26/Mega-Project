import React from 'react'
import * as Icons from 'react-icons/vsc'
// import { useDispatch } from 'react-redux';
import { NavLink, useLocation,matchPath } from 'react-router-dom';

function SidebarLinks({link,iconName}) {
    const Icon=Icons[iconName];
    const location=useLocation();
    // const dispatch=useDispatch();
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }



  return (
    <NavLink
    to={link.path}
    className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)?
    "bg-blue-200 text-white":"bg-opacity-0 text-richblack-500"
    } transition-all duration-200`}
    >
    <span className={` absolute left-0 top-0 h-full w-[0.15rem] bg-white ${matchRoute(link.path)? "opacity-100" : "opacity-0"}`}>

    </span>
    <div className="flex items-center gap-x-2">
     <Icon className="text-lg" />
     <span>{link.name}</span>
     </div>
      
    </NavLink>
  )
}

export default SidebarLinks
