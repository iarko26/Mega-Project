import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { removeFromCart } from '../../../../redux/slices/CartItem'
import { FaStar } from "react-icons/fa"

function RenderCartCourses() {
    const {cart}=useSelector((state)=>state.cart);
    const dispatch=useDispatch();

  return (
    <div className='flex flex-1 flex-col'>
    {
        cart.map((course,i)=>{
            <div>
              <div>
                  <img src={course?.thumbnail}
                  alt={course?.courseName}
                   className="h-[148px] w-[220px] rounded-lg object-cover"
                   />
                   <div>
                      <p>{course?.courseName}</p>
                      <p>{course?.category?.name}</p>
                      <div>
                         <span>4.5</span>
                         <ReactStars
                            count={5}
                            size={20}
                            edit={false}
                            activeColor="#ffd700"
                            emptyIcon={<FaStar/>}
                            fullIcon={<FaStar/>}
                            
                         />
                         <span>
                              {
                                course?.ratingandreviews?.length
                              }
                         </span>

                      </div>
                   </div>
              </div>
              <div>
                  <button onClick={()=>dispatch(removeFromCart(course._id))}>
                     <RiDeleteBin6Line/>
                     <span>Remove</span>
                  </button>
                  <p>
                     USD {course?.price}
                  </p>
              </div>

            </div>
        })
    }
      
    </div>
  )
}

export default RenderCartCourses
