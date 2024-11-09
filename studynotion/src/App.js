
import './App.css';
import { Route,Routes} from 'react-router-dom';
import {Home,Navbar,Login,Signup,VerifyEmail,ForgotPassword} from './Pages/index';
import OpenRoute from './Components/core/Auth/OpenRoute';

function App() {
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

    </Routes>
   </div>
  );
}

export default App;
