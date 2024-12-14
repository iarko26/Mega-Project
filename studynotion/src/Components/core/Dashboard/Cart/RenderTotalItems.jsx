import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function RenderTotalItems() {
    const{total,cart}=useSelector((state)=>state.cart);
    const {token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.profile)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    function handleBuyNow(){
        const courses=cart.map((course)=>course._id)
        
    }
  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-500 bg-[#FFF0E5] p-6">
        <p className="mb-1 text-sm font-medium text-richblack-900">Total:</p>
        <p className="mb-6 text-3xl font-medium text-richblack-500">USD {total}</p>
      <button
      className="cursor-pointer rounded-md bg-blue-200 py-2 px-5 font-semibold text-white"
      >
          Buy Now
      </button>

    </div>
  )
}

export default RenderTotalItems
