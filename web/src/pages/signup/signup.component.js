import React, { useEffect, useState } from 'react'
import { signUp } from '../../redux/features/user.feature'
import { useDispatch , useSelector } from 'react-redux'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {deleteUser,getAuth} from 'firebase/auth'
import '../../config/firebase-config';


const SignUp = () => {

  const [{email,password} , setState ] = useState({email:"",password:""});

  const [firebaseUser,setFirebaseUser] = useState([]);
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  useEffect( () => {
    console.log(userState);
  },[userState]);

  const signUpWithEmailAndPassword = (email,password) => {
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(userCred =>{
      const user = userCred.user;
      setFirebaseUser(user);
      console.log("FIREBASE USER::::     " + user.refreshToken);
    })
    .catch(error => {
      console.log("Error message::::   " + error.message);
    })
  };

  const signInWithEmailAndPassword = (email,password) => {
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(userCred =>{
      const user = userCred.user;
      console.log("FIREBASE LOGIN USER::::     " + user.emailVerified);
    })
    .catch(error => {
      console.log("Error message::::   " + error.message);
    })
  };

  const deleteFirebaseUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log("Firebase USER ::   " + firebaseUser)
    deleteUser(firebaseUser)
    .then(() => {
      // User deleted.
      console.log("USER DELETED")
    })
    .catch((error) => {
      // An error ocurred
      // ...
      console.log(error.message);
    });
  }


  const handleChange = ( event ) => {
    const {value,name} = event.target;
    setState( prevState => ({...prevState,[name]:value}));
    
    
    
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    signInWithEmailAndPassword(email,password);
    dispatch(signUp({email,password}));
    setState({email:"",password:""})

  }


  return (
    <div>
        <h2>Register Yourself</h2>

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

          <input type="submit" value="Sign Up" />
        </form>
        <button
        onClick={ deleteFirebaseUser } >DELETE USER</button>
    </div>
  )
}

export default SignUp;