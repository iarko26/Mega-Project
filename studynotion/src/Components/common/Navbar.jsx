import React, { useEffect, useState } from 'react'
import { Link,matchPath,useLocation} from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Dark.png'
import {NavbarLinks} from '../../data/navbar-links'
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { useSelector } from 'react-redux'
import { FaCartShopping } from "react-icons/fa6";
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
                               <div className='flex items-center gap-2 group'>
                                    <p>{elem.title}</p>
                                    <IoIosArrowDropdownCircle/>
                                    <div className='invisible absolute left-[50%] rounded-md opacity-0 transition-all duration-200  bg-white text-richblack-900 group-hover:visible group-hover:opacity-100 w-[300px] flex flex-col p-4 
                                   translate-x-[-50%] translate-y-[80%] '>
                                     
                                      
                                        {
                                          loading?(<p className='text-center'>loading...</p>):(sublinks && sublinks.length)?(
                                            sublinks.map((sublink,i)=>{
                                              return(
                                                <Link key={i}>
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
            user && user?.accountType === "student" &&(
                  <Link to='/dashboard/cart' className='relative'>
                      <FaCartShopping/>
                      {
                        totalItems>0 && (
                          <span>
                            {
                              totalItems
                            }
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

      
      </div>
     
    </div>
  )
}

export default Navbar
