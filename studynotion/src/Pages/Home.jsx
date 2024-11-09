import React from 'react'
import { Link } from 'react-router-dom'
import HighlightedText from '../Components/core/Homepage/HighlightedText';
import CustomButton from '../Components/core/Homepage/CustomButton';
import { FaArrowRight } from "react-icons/fa";
import Banner from '../assets/Images/banner.mp4'
import Codeblocks from '../Components/core/Homepage/Codeblocks';
import TimelineSection from '../Components/core/Homepage/TimelineSection';
import LanguageLearningSection from '../Components/core/Homepage/LanguageLearningSection';
import InstructorSection from '../Components/core/Homepage/InstructorSection';
import Footer from '../Components/common/Footer';
import Navbar from '../Components/common/Navbar';
import ExploreMore from '../Components/core/Homepage/ExploreMore';
function Home() {
  return (
    <div>
      {/* First Body */}
      <div className=' relative mx-auto w-11/12 flex flex-col items-center  justify-between max-w-maxContent  '>
        <Link to={"/signup"}> 
          <div className=  'group mt-16 p-1 bg-[#FFFFFF] text-richblack-900 font-bold  rounded-full transition-all duration-200 hover:scale-95 mx-auto w-fit '>
            <div className='flex flex-row gap-3 px-10 py-2 rounded-full items-center transition-all duration-200 group-hover:bg-[#FFF0E5] '>
                <p>Become an instructor</p>
                <FaArrowRight/>
            </div>
          </div>
        </Link>

        <div className='text-center text-4xl font-semibold mt-7'>
        Empower Your Future with
        <HighlightedText text={"Coding Skills"}/>
        </div>

        <div className='text-richblack-300 mt-4 text-center text-lg font-bold w-[90%]'>
           With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>
        <div className='flex flex-row gap-7 mt-8 '>
        <CustomButton linkto={'/signup'} active={true} >
          Learn More
        </CustomButton>
        <CustomButton  linkto={'/login'} active={false}>
          Book a Demo
        </CustomButton>

        </div>
        <div className="my-12 mx-3  shadow-[10px_-5px_50px_-5px] shadow-richblack-900  ">
        
        <video className="shadow-[20px_20px_rgba(255,255,255)]"
        muted
        loop
        autoPlay
        >
        <source src={Banner} type='video/mp4'/>

        </video>
        

        </div>
        <div>
           {/* section 1 */}
           <Codeblocks 
           position={"lg:flex-row"}
           heading={
            <div className='text-4xl font-semibold'>
               Unlock Your
               <HighlightedText text={"coding potential "}/>

               with our online courses
            </div>
           }
           subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
           }
           custombutton1={
            {
              children: "Try it yourself",
              linkto: "/signup",
              active: true,
            }
           }
            custombutton2={
            {
              children: "Learn more",
              linkto: "/login",
              active: false,
            }
            }
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codecolor={"text-blue-200"}
            />
        </div>
        <div>
           {/* section 2 */}
           <Codeblocks 
           position={"lg:flex-row-reverse"}
           
           heading={
            <div className='text-4xl font-semibold'>
              Learn
               <HighlightedText text={"coding in seconds"}/>
              
            </div>
           }
           subheading={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
           }
          custombutton1={
            {
              children: "Continue Lessons",
              linkto: "/signup",
              active: true,
            }
          }
            custombutton2={{
             children: "Learn more",
              linkto: "/login",
              active: false,
            
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codecolor={"text-richblack-900"}

            />
        </div>

        <ExploreMore/>
       
      </div>
      

      {/* Middle Body */}
      <div className='bg-pure-greys-5 text-richblack-700 '>
        <div className='shadow-[20px_20px_rgba(255,255,255)] h-[310px]'>
          <div className='w-11/12 flex flex-col gap-5 justify-between mx-auto max-w-maxContent'>
            <div className='h-[200px]'>

            </div>

            <div className='flex flex-row gap-7 text-white place-self-center '>
              <CustomButton linkto={'/signup'} active={true}>
              <div className='flex items-center gap-3'>
                Expolore Full Catalog
                <FaArrowRight/>
              </div>


              </CustomButton>
              <CustomButton linkto={'/login'} active={false}>
                Learn More
              </CustomButton>
            </div>

            </div>

            </div>
          
        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 '>
          <div className='flex flex-row gap-10 mb-10 mt-24'>
            <div className='text-4xl font-semibold w-[57%]'>
                Get the skills you need for a
            <HighlightedText text={"job that is in demand"}/>
            </div>
   
              <div className='flex flex-col gap-10 w-[50%] items-start '>
              <div className='text-[16px] '>
              The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CustomButton linkto={'/signup'} active={true}>
                <div>
                  Learn More
                </div>
              </CustomButton>

              </div>
         
          </div>

          <TimelineSection/>
          <LanguageLearningSection/>

        </div>

            </div>
       { /* Low Body */}
       <div className='w-11/12 flex flex-col items-center mx-auto max-w-maxContent   justify-between gap-8'>
       <InstructorSection/>
       <h2 className='font-semibold text-center mt-10 text-4xl  '>
       Review From Other Learners
       </h2>
        
 
       </div>

        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default Home
