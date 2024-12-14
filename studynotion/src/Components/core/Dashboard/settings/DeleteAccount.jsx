import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteProfile } from '../../../../Services/operations/settingsAPI'
import { FiTrash2 } from "react-icons/fi"
function DeleteAccount() {
    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    async function handleDeleteAccount(){
        try{
            dispatch(deleteProfile(token,navigate))

        }
        catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }
  return (
    <div>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-white p-8 px-12">
         <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700"> 
             <FiTrash2 className="text-3xl text-pink-200"/>
         </div>
         <div  className="flex flex-col space-y-2">
            <h2>
                Delete Account
            </h2>
            <div className="w-3/5 text-richblack-400">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
            </div>
            <button className="w-fit cursor-pointer italic text-blue-200" onClick={handleDeleteAccount}>
            I want to delete my account.
            </button>
         </div>
      </div>
    </div>
  )
}

export default DeleteAccount
