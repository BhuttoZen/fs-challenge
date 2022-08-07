import React, { useEffect, useState } from 'react'
import { signUp , signInUser } from '../../redux/features/user.feature'
import { useDispatch , useSelector } from 'react-redux'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';


const SignUpOrSignIn = ({isSignIn}) => {

  const [{email,password} , setState ] = useState({email:"",password:""});
  const dispatch = useDispatch();

  const navigate = useNavigate();

  
  const signUpWithEmailAndPassword = (email,password) => {
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(userCred =>{
      const user = userCred.user;
      console.log("FIREBASE USER::::     " + user.email);
      
      
      dispatch(signUp(email,password));

      navigate('/products');
    
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
    <div>
        <h2>{isSignIn ? "Sign In with Email and Password!" : "Register Yourself"}</h2>

        <form onSubmit={handleSubmit}>
          
          <label>Email</label>
          <input
          style={{marginLeft:10,marginRight:10}}
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required />
          
          <label>Password</label>
          <input
          style={{marginLeft:10,marginRight:10}}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required />

          <input type="submit" value= { isSignIn ? "Sign In" : "Sign Up"} />
        </form>

    </div>
  )
}

export default SignUpOrSignIn;