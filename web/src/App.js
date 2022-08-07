import React, { useEffect, useState } from "react";
import SignUp from "./pages/Authentication/signup/signup.component";
import SignIn from './pages/Authentication/signin/signin.component';
import './config/firebase-config'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

const Products = () => (
  <div>
    <h1>Products</h1>
  </div>
)
const App = () => {


  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isHomeLocation,setIsHomeLocation] = useState(false);
  const location = useLocation();

  useEffect( ()=>{

    if( location.pathname == '/' ){
      setIsHomeLocation(true);
    }
    else{
      setIsHomeLocation(false);
    }

    firebase.auth().onAuthStateChanged( (userCred) => {
      if(userCred){
        console.log(userCred);
        userCred.getIdToken().then( (token) => {
          //console.log(token)
        })
      }
    })
  },[isUserLoggedIn,location]);

  
  return (
    
    <div>
      <h1>Welcome to Products Dashboard</h1>
      {
        !isUserLoggedIn && isHomeLocation?
        <div>
          <h1>Already have an Account! Sign In</h1>
          <Link to={'/signin'}>Sign In</Link>
          <h1>Are You a new user! Sign Up</h1>
          <Link to={'/signup'}>Sign Up</Link>
        </div>
        :
        null
      }
      {
        (isHomeLocation && isUserLoggedIn) ? 
        <div>
          <h1>Go to Products page</h1>
          <Link to={'/products'}>Products</Link>
        </div>
        :
        null
      }
      <Routes>
        { !isUserLoggedIn && (
        <Route 
        path = "/signin" 
        element={<SignIn />} 
        />
        )}

{ !isUserLoggedIn && (
      <Route 
        path = "/signup" 
        element={<SignUp />} 
        />
      )}

      {isUserLoggedIn && (<Route 
        path = "/products" 
        element={<Products />} 
        />)}
      
      </Routes>
    </div>

  )};

export default App;