import React, { useEffect, useState } from 'react'
import { signUpUser , signInUser } from '../../redux/features/user.feature'
import { useDispatch , useSelector } from 'react-redux'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import '../../config/firebase-config';
import { Link, useNavigate } from 'react-router-dom';

import './signup-or-signin.styles.css'

import FormInput from  '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignUpOrSignIn = ({isSignIn}) => {

  const [{email,password} , setState ] = useState({email:"",password:""});
  const dispatch = useDispatch();

  const navigate = useNavigate();

  
  const signUpWithEmailAndPassword = (email,password) => {
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(userCred =>{
      const user = userCred.user;
      console.log("FIREBASE USER::::     " + user.email);
      
      user.getIdToken().then((token) =>{
        //console.log(token);
        dispatch(signUpUser({ user: { email,password } , token }));
        navigate('/products');  
      })
    
    })
    .catch(error => {
      console.log("Error message::::   " + error.message);
    })
  };


  const signInWithEmailAndPassword = (email,password) => {
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(userCred =>{
      const user = userCred.user;

      user.getIdToken().then((token) =>{
        //console.log(token);
        dispatch(signInUser({ user: { email,password } , token }));
        navigate('/products');  
      })
      console.log("FIREBASE LOGIN USER ::  " + user.email);
    })
    .catch(error => {
      console.log("Error message ::  " + error.message);
    })
  };

  const handleChange = ( event ) => {
    const {value,name} = event.target;
    setState( prevState => ({...prevState,[name]:value}));  
  }

  const handleSubmit = (event) =>{
    event.preventDefault();

    isSignIn ? signInWithEmailAndPassword(email,password) : signUpWithEmailAndPassword(email,password);
    
    //setState({email:"",password:""})

  }


  return (
    <div className='signup-or-signin'>
        <h2>{isSignIn ? "Login to your account" : "Register Yourself"}</h2>
        <h5>{isSignIn ? "Don't have an account?" : "Already have an account?"}</h5>
        <Link to={isSignIn ? "/signup" :"/signin"}>{isSignIn ? "Go to sign up" : "Go to sign in"}</Link>

        <form className='user-form' onSubmit={handleSubmit}>
          
          <FormInput
          style={{marginLeft:10,marginRight:10}}
          type="email"
          name="email"
          label = "Email"
          value={email}
          handleChange={handleChange}
          required />
          
          <FormInput
          style={{marginLeft:10,marginRight:10}}
          type="password"
          name="password"
          label="Password"
          value={password}
          handleChange={handleChange}
          required />

          <CustomButton type="submit" > { isSignIn ? "Sign In" : "Sign Up"} </CustomButton>
        </form>

    </div>
  )
}

export default SignUpOrSignIn;