import React from 'react'
import Footer from '../Components/common/Footer'
import ContactFormSection from '../Components/core/About/ContactFormSection'
import ReviewSlider from '../Components/common/ReviewSlider'
function Contact() {
  return (
    <div>
         <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-black  lg:flex-row">
         <div className="lg:w-[40%] ">
              <ContactFormSection />
           </div>
         
         </div>
         <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-white text-richblack-900">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  )
}

export default Contact
