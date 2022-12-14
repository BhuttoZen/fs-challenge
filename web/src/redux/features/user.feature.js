import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:5000/'

const initialState = {
    
    userData : {
        email : '',
        password : '',
        userToken:''
    },
    isLoggedIn : false
};

//----//
export const signInUser = createAsyncThunk(
    "user/signInUser",
    async( data ) => {
        try{
            const userData = data.user;

            const response = await axios.post(
                (baseUrl + 'user_signin'),
                {email: userData.email,password:userData.password},
                {headers: { authorization : 'Bearer ' + data.token }},
                );

            console.log(response);
            
            return {email:userData.email,password:userData.password,userToken:data.token};
        }
        catch (e){
            console.error(e);
        }
    }
);
//----//
export const signUpUser = createAsyncThunk(
    "user/signUpUser",
    async( data ) => {
        try{
            const userData = data.user;

            const response = await axios.post(
                (baseUrl + 'user_register'),
                {email: userData.email,password:userData.password},
                {headers: { authorization : 'Bearer ' + data.token }},
                );

            console.log(response);
            
            return {email:userData.email,password:userData.password,userToken:data.token};
        }
        catch (e){
            console.error(e);
        }
    }
);

//----/
const userSlice = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
        signUp ( state , action ){
            
            return {
                ...state,
                userData : {
                    email : action.payload.email,
                    password : action.payload.password,
                    userToken : action.payload.userToken
                    
                },
                isLoggedIn : true
            }
        },
    },
    extraReducers : (builder) => {
        builder.addCase(signInUser.fulfilled , (state,action) => {

            return {
                ...state,
                userData : {
                    email : action.payload.email,
                    password : action.payload.password,
                    userToken : action.payload.userToken
                },
                isLoggedIn : true
            }  
        }).addCase(signInUser.rejected , (state,action) => {
            console.log("Something went wrong");
        })

        builder.addCase(signUpUser.fulfilled , (state,action) => {

            return {
                ...state,
                userData : {
                    email : action.payload.email,
                    password : action.payload.password,
                    userToken : action.payload.userToken
                },
                isLoggedIn : true
            }  
        }).addCase(signUpUser.rejected , (state,action) => {
            console.log("Something went wrong");
        })

        

    }
});


export const {signUp,signIn} = userSlice.actions;
export default userSlice.reducer;
