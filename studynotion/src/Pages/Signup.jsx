import React from 'react'
import  loginimg from '../assets/Images/login.jpg'
import Template from '../Components/core/Auth/Template'
function Signup() {
  return (
    <Template
        title='Join the millions learning to code with StudyNotion for free'
        subtitle="Build skills for today, tomorrow, and beyond."
        description="Education to future-proof your career."
        img={loginimg}
        formType='signup'
    />
  )
}

export default Signup
