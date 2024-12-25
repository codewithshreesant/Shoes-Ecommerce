
import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import Products from './Products';
import Swipers from './Swiper';
import Footer from './Footer';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

function Home() {
    const Div=styled.div`
        display:flex;
        flex-direction:column;
        align-items:center;
    `

    const Image=styled.img`
        height:60vh;
        width:70vw;
    `

    const ChildDiv=styled.div`
        width:40vw;
        font-family:sans-serif;
        display:flex;
        flex-direction:column;
        gap:0.7rem;
    `


  return (
    <div className='flex flex-col gap-32 my-[1rem]'>
        <Div className='hero-section'>
            <Image src="https://i.pinimg.com/originals/04/77/55/047755b8a81f6010ce8027f0750f7106.jpg" alt="Shoe Image" />
            <ChildDiv>
                <h1 className='text-[2rem] font-bold text-purple-800'>Welcome to Shoe Online</h1>
                <p>
                A Shoe_Online is an online platform that allows customers to browse, select, and purchase footwear from the comfort of their homes.These websites typically feature a wide range of brands, styles, sizes, and colors, often with high-quality images and detailed product descriptions.
                </p>
                <Button variant="contained" color='secondary' className='w-[15vw]'>
                  <NavLink to='/allproducts'> Explore Now </NavLink> 
                </Button>
            </ChildDiv>    
        </Div>
        <Products/>
        <Swipers />
          
    </div>

  )
}


export default Home 