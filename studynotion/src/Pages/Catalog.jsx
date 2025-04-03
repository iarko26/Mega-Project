import React, { useEffect, useState } from 'react'
import { getCatalogPageData } from '../Services/operations/catalogAPI'
import Footer from '../Components/common/Footer'
import { apiconnector } from '../Services/apiconnector'
import { categories } from '../Services/apis'
import Course_card from '../Components/core/Catalog/Course_card'
import Course_Slider from '../Components/core/Catalog/Course_Slider'
import Error from './Error'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Catalog() {
    const [catelogPageData,setCatalogPageData]=useState(null)
    const {catalogName}=useParams()
    const [categoryId,setCategoryId]=useState("")
    const [active,setActive]=useState(1)
    const {loading}=useSelector((state)=>state.profile)

 



    useEffect(()=>{
       const fetchCategoryName=async()=>{
        try{
          const response=await apiconnector("GET",categories.CATEGORIES_API)
          const category_id=response?.data?.data?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()===catalogName
        )[0]._id
        setCategoryId(category_id)


        }
        catch(error){
          console.log("Could not fetch Categories.",error)

        }
       }
        fetchCategoryName()
    },[catalogName])
    useEffect(()=>{
      if(categoryId){
        const fetchCatalogPageData=async()=>{
          try{
            const response=await getCatalogPageData(categoryId)
            setCatalogPageData(response)

          }
          catch(error){
            console.log("Could not fetch Catalog Page Data",error)
          }
        }
        fetchCatalogPageData()
      }
      

    },[categoryId])

    if (loading || !catelogPageData) {
      return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      )
    }
    if (!loading && !catelogPageData.success) {
      return <Error />
    }
  return (
    <>  

      <div className=" box-content bg-white px-4"> 
      <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
             <p className="text-sm text-richblack-500">
                   {`Home / Catalog / `}
                <span className='text-blue-200'>
                   {catelogPageData?.data?.selectedCategory?.name}
                </span>
             </p>
             <p className='text-3xl text-richblack-700'>
             {catelogPageData?.data?.selectedCategory?.name}
             </p>
             <p className="max-w-[870px] text-richblack-500">
             {catelogPageData?.data?.selectedCategory?.description}
             </p>

         </div>
      </div>
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
         <div className='section_heading'>
          Courses to get you started
         </div>
         <div className="my-4 flex border-b border-b-richblack-600 text-sm">
            <p
            className={`
            px-4 py-2 ${
            active===1?"border-b border-b-richblack-600 text-richblack-700":"text-richblack-500"
            }
            cursor-pointer
            `}
            onClick={()=>setActive(1)}
            >
               Most Populer
            </p>
            <p
            className={`
            px-4 py-2 ${
            active===2?"border-b border-b-richblack-600 text-richblack-700":"text-richblack-500"
            }
            cursor-pointer
            `}
            onClick={()=>setActive(2)}
            >
               New
            </p>
         </div>
         <div>
           <Course_Slider
            Courses={catelogPageData?.data?.selectedCategory?.courses}
           />
         </div>
      </div>
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top courses 
        </div>
        <div className="py-8">
          <Course_Slider
            Courses={catelogPageData?.data?.differentCourses}
          />
        </div>
      </div>
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
      <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                   {catelogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,i)=>{
                    return(
                      <Course_card
                      key={i}
                      course={course}
                      Height={"h-[400px]"}



                      />
                    )
                   })
                   
                   }
                </div>
             </div>
         
      </div>
      <Footer/>
    </>
  )
}

export default Catalog
