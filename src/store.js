import { configureStore } from "@reduxjs/toolkit";
import { shoesApi } from "./services/Shoes";
import shoeReducer from "./services/ShoeSlicer";
const store=configureStore({
    reducer:{
        shoeData:shoeReducer,
        [shoesApi.reducerPath]:shoesApi.reducer
    },

    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(shoesApi.middleware)
});

export default store;