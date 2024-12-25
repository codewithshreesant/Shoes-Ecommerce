
import {createSlice} from '@reduxjs/toolkit';

const  initialState={
    cart:[]
}

const shoeSlicer = createSlice({ 
    name: 'shoe',
    initialState,
    reducers:{
        addToCart:(state, action)=>{
            console.log("add to  cart payload ",action.payload);
            state.cart.push(action.payload);
        },
        removeFromCart:(state, action)=>{
            state.cart=state.cart.filter((item)=>item._id !== action.payload);
        },
        clearCart:(state)=>{
            state.cart=[];
        }
    }
})

export const {addToCart, removeFromCart, clearCart} = shoeSlicer.actions;

export default  shoeSlicer.reducer;