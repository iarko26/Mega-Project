import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {configureStore } from '@reduxjs/toolkit';

import rootReducer from './redux/reducers';
const root = ReactDOM.createRoot(document.getElementById('root'));
const store=configureStore({
  reducer:rootReducer
})
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    
    <App />
    <ToastContainer/>
   
    </Provider>
   
  </BrowserRouter>
  </React.StrictMode>

);

