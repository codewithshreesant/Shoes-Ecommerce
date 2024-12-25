
import React, { useState } from 'react'
import { use } from 'react';
import { useGetShoesQuery } from '../services/Shoes';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addToCart } from '../services/ShoeSlicer';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
function Products() {
    let [cartAdded, setCartAdded]=useState(false);
    const ProductDiv=styled.div`
        display:grid;
        grid-template-columns:repeat(3, 1fr);
        gap:1rem;
    `

    const ProductImage=styled.img`
        height:200px;
        width:200px;
    `
    const dispatch=useDispatch();
    let [Categories, setCategories]=useState('all');
    console.log(Categories)

    let {data, error, isLoading}=useGetShoesQuery();
   
    if(isLoading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>Error: {error.message}</div>
    }
    let filterShoe=Categories === 'all' ? data?.message : data?.message.filter((field)=>{
        return field.category == Categories
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setCartAdded(false);
      };

      const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

  return (
    <div>
        <div>
            <h1 className='text-[3rem] text-purple-700 font-bold text-center'>Shoes Categories</h1>
        </div>
        <select onChange={(e)=>setCategories(e.target.value)} className='h-[6vh] w-[12vw] border-2 border-solid border-black'>
            <option value="Running">Running</option>
            <option value="Casual">Casual</option>
            <option value="Training">Training</option>
            <option value="Skateboarding">Skateboarding</option>
        </select>
        <Snackbar
        open={cartAdded}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Shoe Added in Cart"
        action={action}
      />
        <ProductDiv>
        
            {
                filterShoe && filterShoe.map((element, index)=>{
                    return <Card>
                        <CardMedia sx={{height: 140, width: 350}} image={element.image} alt="shoe" />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {element.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div"></Typography>
                        <p>{element.price}</p>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {element.description}
                        </Typography>
                        <h2>{element.category}</h2>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={()=>{dispatch(addToCart(element)); setCartAdded(true)}}>Add To Cart</Button>
                            {/* <Button size="small">Learn More</Button> */}
                        </CardActions>
                        
                    </Card>   
                })
            }
        </ProductDiv>
    </div>
  )
}


export default Products     