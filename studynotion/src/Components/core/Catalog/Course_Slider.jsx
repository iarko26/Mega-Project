import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'

import { Pagination,FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import Course_card from './Course_card';
function Course_Slider({Courses}) {
  return (
    <div>
    {
        Courses?.length?
        (
            <Swiper
            slidesPerView={1}
            spaceBetween={25}
            loop={true}
            modules={[FreeMode, Pagination]}
            breakpoints={{
                1024:{
                    slidesPerView:3
                }
            }}
            className="max-h-[30rem]"

            
            >
            {
                Courses?.map((course,i)=>{
                    return(
                        <SwiperSlide key={i}>
                            <Course_card course={course} Height={"h-[250px]"} />
                        </SwiperSlide>
                    )
                })
            }
              
            </Swiper>
        ):(
            <p className="text-xl text-richblack-900">No Course Found</p>
        )
    }
      
    </div>
  )
}

export default Course_Slider
