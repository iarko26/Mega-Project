import React from 'react'
import SidebarLinks from './SidebarLinks'
import {sidebarLinks} from '../../../data/dashboard-links'
import { logout } from '../../../Services/operations/authAPI'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import { useState } from 'react'
import ConfirmationModal from '../../common/ConfirmationModal'
function Sidebar() {
    const {user,loading:profileLoading}=useSelector((state)=>state.profile);
    const {loading:authLoading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    //to keep track of the modal
    const [confirmModal,setconfirmModal]=useState(null);
    if(authLoading || profileLoading)
        {
            return(
                <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                  <div className="spinner"></div>
                </div>
            )
        }
  return (
    <div>
             <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-white py-10">
                 <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link)=>{
                            if(link.type && user?.accountType!==link.type)
                            {
                                return null;
                            }
                            return <SidebarLinks key={link.id} link={link} iconName={link.icon} 
                            
                             />

                            
                        })
                    }

                 </div>
                 <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700">
                    <div className='flex flex-col'>
                        <SidebarLinks link={{name:"Settings" , path:"/dashboard/settings"}}  iconName="VscSettingsGear"/>
                        <button
                         className="px-8 py-2 text-sm font-medium text-richblack-300"
                         onClick={()=>setconfirmModal({
                            text1:"Are you sure you want to logout?",
                            text2:"You can always login back",
                            btntext1:"Logout",
                            btntext2:"Cancel",
                            btnhandler1:()=>dispatch(logout(navigate)),
                            btnhandler2:()=>setconfirmModal(null)

                        })}
                        >
                          <div className="flex items-center gap-x-2">
                            <VscSignOut className='text-lg ring-richblack-900'/>
                            <span>Logout</span>
                          </div>


                        </button>



                    </div>


                 </div>
          
       </div>
        {
            confirmModal && <ConfirmationModal modaldata={confirmModal}/>
        }
    </div>
  )
}

export default Sidebar
