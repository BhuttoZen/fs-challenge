import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:5000/'

const initialState = {
    
    productData : [],
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

            let newProductData = productData.push(product)

            return {
                ...state,
                productData :  newProductData,
                loading : false
            }
        }).addCase(addProduct.rejected , (state,action) => {
            console.log("Something went wrong");
        })
    }
});


export default productSlice.reducer;
