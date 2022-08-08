
import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'


import userReducer from './features/user.feature';
import productReducer from './features/product.feature';


const reducers = combineReducers({
  user : userReducer,
  product : productReducer
 });


const persistConfig = {
  key: 'root',
  storage,
  //blacklist : ['user','product']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export default store;