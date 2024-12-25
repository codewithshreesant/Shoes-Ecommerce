import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { removeFromCart } from '../services/ShoeSlicer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import config from '../Khalti/KhaltiConfig'
import KhaltiCheckout from "khalti-checkout-web";
// import { useDispatch } from 'react-redux'; 
function BuyNow() {
    const BuyDiv=styled.div`
        font-size:1rem;

    `
    let checkout = new KhaltiCheckout(config);
    const dispatch = useDispatch();
    const [product, setProduct] = useState({})
    const carts = useSelector(state => state.shoeData.cart);
    console.log("carts data ",carts);

    const totalPrice=carts?.reduce((acc,curr)=>acc+curr.price,0);
  return (
    <div>
        <BuyDiv>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                          <span className='font-bold text-[1rem]'>Product Name</span>  
                        </TableCell>
                        <TableCell>
                            <span className='font-bold text-[1rem]'>Price</span>
                        </TableCell>
                        <TableCell>
                            <span className='font-bold text-[1rem]'>Category</span>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
            {carts?.map((cart,index)=>{
                return(
                    <TableRow key={index}> 
                        {/* <img src={cart.image} alt={cart.name} /> */}
                        <TableCell>{cart.productname}</TableCell>
                        <TableCell>{cart.price}</TableCell>
                        <TableCell>{cart.category}</TableCell>
                        <TableCell>
                            <NavLink onClick={()=>dispatch(removeFromCart(cart._id))} className='text-blue-700'>Remove</NavLink>
                        </TableCell>
                    </TableRow>
                )
            })}
            </TableBody>   
            </Table>
            <div className='flex flex-col gap-6 my-[1rem]'>
                <p className='text-[1.2rem] font-bold'>{`Total Price = ${totalPrice}`}</p>
                <Stack className='w-[8rem]'>
                    <Button variant='contained' color='secondary' onClick={()=> checkout.show({amount: totalPrice*100})}>Pay Now</Button> 
                </Stack>
            </div>
        </BuyDiv>
    </div>
  )
}

export default BuyNow