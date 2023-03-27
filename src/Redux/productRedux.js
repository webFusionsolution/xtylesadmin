import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState:{
       products: [],
       isFetching: false,
       error: false,
    },
    reducers:{
       //GET ALL DATA
        getProductStart: (state) =>{
            state.isFetching= true;
            state.error= false;
        },  
        getProductSuccess: (state, action) =>{
            state.isFetching= false;
            state.products = action.payload;
        },
        getProductFailure: (state) => {
            state.isFetching= false;
            state.error= true;
        },
        // DELETE
        deleteProductStart: (state) =>{
            state.isFetching= true;
            state.error= false;
        },  
        deleteProductSuccess: (state, action) =>{
            state.isFetching= false;
            state.products.splice(
              state.products.findIndex((item)=> item._id === action.payload),
              1 
            );
        },
        deleteProductFailure: (state) => {
            state.isFetching= false;
            state.error= true;
        },
        //UPDATE
        updateProductStart: (state) =>{
            state.isFetching= true;
            state.error= false;
        },  
        updateProductSuccess: (state, action) =>{
            state.isFetching= false;
            state.products.splice(
              state.products[state.products.findIndex((item)=> 
                item._id === action.payload.id)] = action.payload.product,
               
            );
        },
        updateProductFailure: (state) => {
            state.isFetching= false;
            state.error= true;
        },
        //ADDING NEW ITEM
        AddProductStart: (state) =>{
            state.isFetching= true;
            state.error= false;
        },  
        AddProductSuccess: (state, action) =>{
            state.isFetching= false;
            state.products.splice(
              state.products.push(action.payload),
              
            );
        },
        AddProductFailure: (state) => {
            state.isFetching= false;
            state.error= true;
        },
    },

 });

 export const { getProductStart, getProductSuccess,
     getProductFailure, deleteProductStart, deleteProductSuccess, deleteProductFailure,
     updateProductStart, updateProductSuccess, updateProductFailure,
     AddProductStart, AddProductSuccess, AddProductFailure
     } = productSlice.actions;
 export default productSlice.reducer;