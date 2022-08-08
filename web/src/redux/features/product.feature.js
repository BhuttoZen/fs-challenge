import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { useSelector } from 'react-redux';
const baseUrl = 'http://localhost:5000/'

const initialState = {
    
    productData : [
        {
          title: 'hats',
          imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
          description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          id: 1,
        },
        {
          title: 'jackets',
          imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
          id: 2,
          description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          title: 'sneakers',
          imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
          description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          id: 3,
        },
        {
          title: 'womens',
          imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
          id: 4,
          description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          title: 'mens',
          imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
          description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          id: 5
        }
      ],
    loading : true
};

//----//
export const addProduct = createAsyncThunk(
    "product/addProduct",
    async( data ) => {
        try{
            const productData = data.product;

            const response = await axios.post(
                (baseUrl + 'add_product'),
                {title: productData.title,description:productData.description,imageUrl:productData.imageUrl},
                {headers: { authorization : 'Bearer ' + data.token }},
                );

            console.log(response);
            
            return {title: productData.title,description:productData.description,imageUrl:productData.imageUrl};
        }
        catch (e){
            console.error(e);
        }
    }
);
//----//
//----/
const productSlice = createSlice({
    name : 'product',
    initialState : initialState,
    extraReducers : (builder) => {
        builder.addCase(addProduct.fulfilled , (state,action) => {

            let product = {
                title : action.payload.title,
                description : action.payload.description,
                imageUrl : action.payload.imageUrl
            }

            return {
                ...state,
                productData :  [...state.productData,product],
                loading : false
            }
        }).addCase(addProduct.rejected , (state,action) => {
            console.log("Something went wrong");
        })
    }
});


export default productSlice.reducer;
