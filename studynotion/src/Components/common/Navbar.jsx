import React, { useEffect, useState } from 'react'
import { Link,matchPath,useLocation} from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Dark.png'
import {NavbarLinks} from '../../data/navbar-links'
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { ACCOUNT_TYPE } from '../../utils/constants'
import { useSelector } from 'react-redux'
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import CustomButton from '../core/Homepage/CustomButton'
import Profiledropdown from '../core/Auth/Profiledropdown'
import { apiconnector } from '../../Services/apiconnector'
import { categories} from '../../Services/apis'

function Navbar() {
  const {token}=useSelector((state)=>state.auth);
  const {user}=useSelector((state)=>state.profile);
  const {totalItems}=useSelector((state)=>state.cart);
  const [sublinks,setsublinks]=useState([]);
  const[loading,setloading]=useState(false);
  async function fetchsublinks(){
    try{
      setloading(true);
      const res=await apiconnector("GET",categories.CATEGORIES_API);
      setsublinks(res.data.data);

    }catch(error){
      console.error("Could not fetch the category list");
    }
    finally{
      setloading(false);
    }
  }
  useEffect(()=>{
    fetchsublinks();
  },[])


  



const location=useLocation();

function matchRoute(route){
  return matchPath({path:route},location.pathname);
}
  return (
    <div className=' flex items-center justify-center h-14 border-b-[1px] border-b-richblack-300'>
      <div className='w-11/12 flex items-center max-w-maxContent justify-between'>
          <Link to="/">
               <img src={Logo} width={160} height={42} alt='StudyNotion' loading='lazy'/>
          </Link>
          <nav>
          <ul className='flex gap-x-6 '>
              {
                 NavbarLinks.map((elem,i)=>{
                      return(
                        <li key={i} >
                            {
                                elem.title === "Catalog" ? (
                               <>
                               <div className='group relative flex cursor-pointer items-center gap-1'>
                                    <p>{elem.title}</p>
                                    <IoIosArrowDropdownCircle/>
                                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                    <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                     
                                      
                                        {
                                          loading?(<p className='text-center'>loading...</p>):(sublinks && sublinks.length)?(
                                            sublinks.map((sublink,i)=>{
                                              return(
                                                <Link key={i}  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50">
                                                  {
                                                    sublink.name
                                                  }
                                                </Link>
                                              )
                                            })
                                          ):(
                                            <p>
                                              Not found!!!!
                                            </p>
                                          )
                                        }
                                      
                                    </div>
                              </div>
                               </>
                                ):(
                                    
                                   <Link to={elem?.path}>
                                       <p className={`${matchRoute(elem?.path)?
                                       "text-blue-200":"text-richblack-900"
                                       }`}>
                                            {elem.title}
                                       </p>
                                   </Link>
                                  
                                )
                            }
                        </li>
                      )
                 })
              }
          </ul>
      </nav>
      {/* login and sighnup dashboard */}
      <div className='flex items-center gap-x-4'>
          {
            user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR &&(
                  <Link to='/dashboard/cart' className='relative'>
                  <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                      {
                        totalItems>0 && (
                          <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                {totalItems}
                             </span>
                        )
                      }

                  </Link>
            )
              
          }
          {
            token===null && (
              <CustomButton active={true}
                linkto={"/login"}>
                    <div className='flex flex-row gap-2 items-center'>
                       Login
                    </div>
                </CustomButton>
            )


          }
          {
            token===null && (
              <CustomButton active={false}
                linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                       Sign Up
                    </div>
                </CustomButton>
            )


          }
          {
            token!==null && <Profiledropdown/>
          }
        
      </div>
          <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>

      
      </div>
     
    </div>
  )
}

export default Navbar
