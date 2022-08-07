import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    userData : {
        email : '',
        password : ''
    },
    isLoggedIn : false
};

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
                    
                },
                isLoggedIn : true
            }
        },
        signIn ( state , action ){
            
            return {
                ...state,
                userData : {
                    email : action.payload.email,
                    password : action.payload.password
                },
                isLoggedIn : true
            }
        }
    }
});


export const {signUp,signIn} = userSlice.actions;
export default userSlice.reducer;
