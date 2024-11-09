import React from 'react'
import  loginimg from '../assets/Images/login.jpg'
import Template from '../Components/core/Auth/Template'
function Login() {
  return (
    <Template
        title='Welcome Back'
        subtitle="Build skills for today, tomorrow, and beyond."
        description="Education to future-proof your career."
        img={loginimg}
        formType='login'
    />
  )
}

export default Login
