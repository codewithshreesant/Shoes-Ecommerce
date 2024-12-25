
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const shoesApi = createApi({
    reducerPath: 'shoesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/product/'}),
    endpoints:(builder) => ({
        getShoes:builder.query({
            query: () => {
                return {
                    url: 'products',
                    method: 'GET'
                }
            }
        }),
        getShoe:builder.query({
            query: (id) => {
                return {
                    url: `products/${id}`,
                    method: 'GET'
                }
            }
        }),
        createShoe:builder.mutation({
            query: (shoe) => {
                return{
                    url: `create`,
                    method: 'POST',
                    body: shoe,
                    
                }
            }
        }),
        updatShoe:builder.mutation({
            query:  ({id, shoe}) =>{
                console.log("product data ",shoe);
                return {
                    url: `update/${id}`,
                    method: 'PUT',
                    body: shoe,
                    
                }
            }
        }),
        deleteShoe:builder.mutation({
            query: (id) =>{
                return {
                    url: `delete/${id}`,
                    method: 'DELETE'
                }
            }
        })
    })
});

export const {useGetShoesQuery, useGetShoeQuery, useCreateShoeMutation, useUpdatShoeMutation, useDeleteShoeMutation} = shoesApi;   

// export {useGetShoesQuery, useGetShoeQuery, useCreateShoeMutation, useUpdatShoeMutation, useDeleteShoeMutation}; 



