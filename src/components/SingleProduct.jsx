import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetShoeQuery } from '../services/Shoes';

function SingleProduct() {
    const {id}=useParams();

    const {data,loading,error}=useGetShoeQuery(id);
    console.log("single shoe data is ",data);
  return (
    <div>SingleProduct</div>
  )
}


export default SingleProduct  