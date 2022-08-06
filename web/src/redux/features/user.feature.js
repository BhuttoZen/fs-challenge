import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    user : {
        email : '',
        password : ''
    },
    loading : false

};

const userSlice = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
        signUp ( state , action ){
            state.user.email = action.payload.email;
            state.user.password = action.payload.password;
        }
    }
});


export const {signUp} = userSlice.actions;
export default userSlice.reducer;
