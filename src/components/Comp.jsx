
import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Products from './Products'
import Footer from './Footer'

function Comp() {
  return (
    <div>
        <Navbar  />
        <Outlet/>
        <Footer />  
    </div>
  )
}

export default Comp