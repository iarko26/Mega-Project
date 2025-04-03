
import './App.css';
import { Route,Routes} from 'react-router-dom';
import {Home,Navbar,Login,Signup,VerifyEmail,ForgotPassword,UpdatePassword,About,Contact,Error,CourseDetails} from './Pages/index';
import OpenRoute from './Components/core/Auth/OpenRoute';
import MyProfile from './Components/core/Dashboard/MyProfile';
import PrivateRoute from './Components/core/Auth/PrivateRoute';
import Dashboard from './Pages/Dashboard';
import { useSelector } from 'react-redux';
import Settings from './Components/core/Dashboard/settings/Settings';
import { ACCOUNT_TYPE } from './utils/constants';
import EnrolledCourses from './Components/core/Dashboard/EnrolledCourses';
import Cart from './Components/core/Dashboard/Cart/Cart';
import AddCourse from './Components/core/Dashboard/AddCourse/Index';
import MyCourses from './Components/core/Dashboard/MyCourses';
import EditCourse from './Components/core/Dashboard/EditCourses/EditCourse';
import Catalog from './Pages/Catalog';

function App() {

  const {user}=useSelector((state)=>state.profile)
  return (
   <div className='w-screen min-h-screen bg-[#FFF0E5] flex flex-col font-inter'>
    <Navbar/>
    <Routes>
      <Route path='/' element={
        <OpenRoute>
          <Home/>
        </OpenRoute>
      }/>
      <Route path='/login' element={<OpenRoute>
        <Login/>
      </OpenRoute>}/>
      <Route path='/signup' element={
        <OpenRoute>
          <Signup/>
        </OpenRoute>
      }/>
      <Route path='/forgot-password' element={
        <OpenRoute>
          <ForgotPassword/>
        </OpenRoute>
      }
      />
      <Route path='/verify-email'
      element={
        <OpenRoute>
          <VerifyEmail/>
        </OpenRoute>
      }
      />
      <Route path='resetpassword/:id' element={
        <OpenRoute>
          <UpdatePassword/>
        </OpenRoute>
      }
      />

      <Route path='/about' element={
        <OpenRoute>
           <About/>
        </OpenRoute>
      }/>

      <Route path='/contact' element={
           
                <Contact/>
           
      }
      />
      <Route path='/courses/:courseId' element={<CourseDetails/>} />
      <Route path='/catalog/:catalogName' element={<Catalog/>} />

       



      <Route 
      element={
        <PrivateRoute>
           <Dashboard/>
        </PrivateRoute>

      }>
         <Route path='dashboard/my-profile' element={<MyProfile/>}/>
         <Route path='dashboard/settings' element={<Settings/>}/>
         

         {
          user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path='dashboard/add-course' element={<AddCourse/>}/>
              <Route path='dashboard/my-courses' element={<MyCourses/>}/>
              <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>}/>
            </>
          )
         }
         {
          user?.accountType===ACCOUNT_TYPE.STUDENT &&(
            <>
              <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
              <Route path='dashboard/cart' element={<Cart/>}/>
            </>
          )
         }
      </Route>


      
      <Route path='*' element={<Error/>}/>

    </Routes>
   </div>
  );
}

export default App;
