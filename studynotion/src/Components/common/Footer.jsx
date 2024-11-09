import React from 'react'
import { FooterLink2 } from '../../data/footer-links'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa'
const Bottomfooter=['Privacy Policy','Cookie Policy','Terms']
const Resources=[
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces"
]
const Plans=[
    "Paid memberships",
    "For students",
    "Business solutions"
]
const Community=[
    "Forums",
    "Chapters",
    "Events"
]

function Footer() {
  return (
    <div className='bg-richblack-800'>
     <div className='flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14'>
      <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
       <div className='lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3'>
       <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
          <img src={Logo} className='object-contain'/>
          <h1 className="text-richblack-50 font-semibold text-[16px]">
           Company
          </h1>
          <div className='flex flex-col gap-2'>
             {
                ["About","Careers","Affiliates"].map((elem,i)=>{
                    return(
                        <div key={i} className='hover:text-richblack-200 duration-200 transition-all cursor-pointer text-[15px]  '>
                            <Link to={elem.toLowerCase()}>{elem}</Link>

                        </div>
                    )
                })
             }
          </div>
          <div className='flex gap-3 text-lg cursor-pointer '>
              <FaFacebook/>
               <FaGoogle/>
                <FaTwitter/>
                    <FaYoutube/>
          
          </div>
          <div>

          </div>
       </div>
       <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
          <h1 className='text-richblack-50 font-semibold text-[16px]'>Resources</h1>
         <div className='flex flex-col gap-3 mt-2'>
         {
            Resources.map((elem,i)=>{
                return(
                    <div key={i} className='hover:text-richblack-200 duration-200 transition-all cursor-pointer text-[15px]'>
                      <Link to={elem.split(' ').join('-').toLowerCase()}>
                        {elem}
                      </Link>

                    </div>
                )
            })
         }

         </div>
         <h1 className='text-richblack-50 font-semibold text-[16px] mt-7'>Support</h1>
         <div className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2'>
            <Link to={'/help-center'}>
                Help Center
            </Link>
         </div>
       </div>

        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
           <h1 className='text-richblack-50 font-semibold text-[16px]'>Plans</h1>
          <div className='flex flex-col gap-2 mt-2'>
            {
                Plans.map((elem,i)=>{
                    return(
                        <div key={i} className='hover:text-richblack-200 duration-200 transition-all cursor-pointer text-[15px]'>
                           <Link to={elem.split(' ').join('-').toLowerCase()}>
                                {elem}
                            </Link>

                        </div>
                    )
                })
            }

          </div>
            <h1 className='text-richblack-50 font-semibold text-[16px] mt-7'>Community</h1>
            <div className='flex flex-col gap-2 mt-2'>
             {
                Community.map((elem,i)=>{
                    return(
                        <div key={i} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                            <Link to={elem.split(' ').join('-').toLowerCase()}>
                                {elem}
                            </Link>
                        </div>
                    )
                })
             }

            </div>
        </div>
          
       </div>

       <div className='lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3"'>
         {
            FooterLink2.map((elem,i)=>{
                return(
                    <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                       <h1 className="text-richblack-50 font-semibold text-[16px]">
                        {
                            elem.title
                        }
                       </h1>
                       <div>
                          {
                            elem.links.map((link,index)=>{
                                return(
                                    <div key={index}  className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                      <Link to={link.link}>
                                        {link.title}
                                      </Link>

                                    </div>
                                )
                            })
                          }
                       </div>

                    </div>
                )
            })
         }

       </div>

      </div>

     </div>
     <div className='flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto text-sm pb-14'>
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
           <div className='flex flex-row'>
           {
                Bottomfooter.map((elem,i)=>{
                    return (
                        <div key={i}  className={` ${
                    Bottomfooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}>
                            <Link to={elem.split(' ').join('-').toLowerCase()}>{elem}</Link>

                        </div>
                    )
                })
            }
           </div>
           <div className='text-center'> 
           Made with ❤️ CodeIo © 2024 Studynotion
           </div>

        </div>


     </div>

      
    </div>
  )
}

export default Footer
