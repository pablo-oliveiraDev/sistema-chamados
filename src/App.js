import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Router from './routes';
import AuthProvider from './Contexts/Auth';
import firebase from './Services/FirebaseConnection';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <div className='container-fluid align-items-center justify-content-center' id='cont-id'>
     
          

       
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer autoClose={3000} theme="colored"  />
    <Router/>
    
    </BrowserRouter>
    </AuthProvider>
    
    </div>
    

  );
}

export default App;
