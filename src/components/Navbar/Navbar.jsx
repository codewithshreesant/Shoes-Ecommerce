
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { showLogout } from '../showLogout'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useSelector } from 'react-redux';
function Navbar() {
  const navigate=useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const cart = useSelector(state => state.shoeData.cart);
  let [token, setToken] = React.useState(localStorage.getItem('token'))
  const isAdmin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/user/admin', {}, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      return res.status === 200;
    } catch (err) {
      console.log("isAdmin error: ", err);
      return false;
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const result = await isAdmin();
      setIsAuthenticated(result);
    };
    checkAdmin();
  },[])
  const handleLogOut = async () => {
    try {
      const response=await axios.post('http://localhost:5000/api/user/logout', {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 200) {
        console.log(response.data)
        console.log('User logged out successfully')
        localStorage.removeItem('token')
      
        navigate('/login')
      } 
    } catch (error) {
      console.log('There was an error!', error)
    }
  }

  const  cartLength=cart.length;

  return (
    <div className='h-[10vh] flex justify-around items-center sticky top-[0px] bg-slate-200'>
      <h1 className='text-[1.5rem] font-bold text-purple-700'>ShoeStore</h1>
      <ul className='flex gap-8 font-bold'>
        <li>
          <NavLink to='/'>Home</NavLink>  
        </li>
        <li>
          <NavLink to='/about'>About</NavLink>  
        </li>
        <li>
          <NavLink to='/allproducts'>products</NavLink>
        </li>
        <li className='relative'>
          <NavLink to='/cart'>
            <ShoppingCartRoundedIcon /> <span
              className='absolute top-[-5px] right-[-5px] font-bold text-purple-700'
            >
                {cartLength}
            </span>
          </NavLink>
        </li>
        {!token &&
        <li className='flex gap-[1rem]'>
          <NavLink to='/login'>
           <button className='px-[0.9rem] py-[0.2rem] rounded bg-purple-800 text-white font-bold'> Login</button>
          </NavLink>
          <NavLink to='/register'>
            <button className='px-[0.9rem] py-[0.2rem] rounded bg-purple-800 text-white font-bold'>Signup</button> 
          </NavLink>
        </li>
      }
      
       {token && 
        <li>
          <button onClick={handleLogOut} className='px-[0.9rem] py-[0.2rem] rounded bg-purple-800 text-white font-bold'>
            Logout
          </button>
        </li>
  }
  {
    isAuthenticated &&
    <li>
      <NavLink to='/admin'>Admin</NavLink>
    </li>
  }
      
      </ul>
    </div>
  )
}


export default Navbar