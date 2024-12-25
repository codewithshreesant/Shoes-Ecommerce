
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, removeFromCart } from '../services/ShoeSlicer';
import { NavLink, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.shoeData.cart);
    console.log("cart data ",cart);
  return (
    <div className='min-h-[55vh]'>
        <h1>Cart</h1>
        <div className='grid grid-cols-3 gap-10'>
            {cart?.map((item) => (
            <div key={item.id}>
                <h3>Shoe Name:{item.productname}</h3>
                <img src={item.image} alt="shoe" height='200px' width='300px'/>
                <p>Shoe Price:{item.price}</p>
                <p>{(item.description).slice(0,50)}</p>
                <h2>{item.category}</h2>
                <Stack spacing={2} direction="row" className='my-[1rem]'>
                  <Button variant="outlined" startIcon={<DeleteIcon />}>
                    <NavLink onClick={()=>dispatch(removeFromCart(item._id))} className='text-blue-700'>Remove</NavLink>
                  </Button>
                </Stack>
            </div>
            ))}
        </div>
        <Stack spacing={2} direction="row" className='my-[1rem] font-bold'>
          <Button variant="contained" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
          <Button variant="outlined" onClick={()=>navigate('/buynow')}>Add to  WishList</Button>
        </Stack>
    </div>
  )
}

export default Cart


