import React from 'react'
import { FiUpload } from "react-icons/fi";
import { useState,useEffect,useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { updateDisplayPicture } from '../../../../Services/operations/settingsAPI';

function ChangeProfilePicture() {
    const {token} = useSelector((state) => state.auth)
    const {user}=useSelector((state)=>state.profile)
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)
    const [imageFile,setImageFile]=useState(null)
    const [previewSource,setPreviewSource]=useState(null)
    const fileInputRef=useRef(null)
    const handleClick=()=>{
        fileInputRef.current.click()
    }
    const handleFileChange=(e)=>{
        const file=e.target.files[0]
        if(file){
            setImageFile(file)
            previewFile(file)
        }
    }
    const previewFile=(file)=>{
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setPreviewSource(reader.result)
        }

    }
    const handleFileUpload=()=>{
        try{
            console.log("Uploading...")
            setLoading(true)
            const formData=new FormData()
            formData.append("displayPicture",imageFile)
            dispatch(updateDisplayPicture(token,formData)).then(()=>{
                setLoading(false)
            })

        }
        catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
          }
    }
    useEffect(()=>{
        if(imageFile){
            previewFile(imageFile)
        }
        
    },[imageFile])
    


  return (
    <div>
       <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-white p-8 px-12 text-richblack-900">
          <div className="flex items-center gap-x-4">
              <img 
              src={previewSource || user?.image}
              alt={`profile-${user?.firstName}`}
               className="aspect-square w-[78px] rounded-full object-cover"
               />
               <div className="space-y-2">
                 <p>Change Profile Picture</p>
                 <div className="flex flex-row gap-3">
                    <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept='image/png,image/jpeg,image/jpg,image/gif'
                    className="hidden"
                    />
                    <button onClick={handleClick} disabled={loading}  className="cursor-pointer rounded-md bg-blue-200 py-2 px-5 font-semibold text-white">
                        Select
                    </button>
                    <button onClick={handleFileUpload} disabled={loading}
                    className="cursor-pointer rounded-md bg-[#FFF0E5] py-2 px-5 font-semibold text-richblack-900 flex items-center gap-x-2" 
                    >
                        Upload
                        <FiUpload className="text-lg text-richblack-900"/>
                        
                    </button>
                 </div>
               </div>
          </div>
       </div>
    </div>
  )
}

export default ChangeProfilePicture
