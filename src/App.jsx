
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Comp from './components/Comp';
import Cart from './components/Cart';
import BuyNow from './components/BuyNow';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import AminDashboardProtect from './admin/AminDashboardProtect';
import AdminDashboard from './admin/AdminDashboard';
import UpdateProduct from './admin/UpdateProduct';
import CreateProduct from './admin/CreateProduct';
import Verify from './components/Verify';
import VerifyResetPassword from './components/VerifyResetPassword';
import ResetPassword from './components/ResetPassword';
import AllProducts from './components/AllProducts';

  const router=createBrowserRouter([
    {
      path:'/',
      element:<Comp />,
      children:[
        {
          path:'/',
          element:<Home />
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/cart',
          element:<Cart />
        },
        {
          path:'/buynow',
          element:<BuyNow />
        },
        {
          path:'/register',
          element:<Register />
        },
        {
          path:'/login',
          element:<Login />
        },
        {
          path:'/verify/:token',
          element:<Verify />
        },
        {
          path:'/resetpassword/:token',
          element:<ResetPassword />
        },
        {
          path:'/allproducts',
          element:<AllProducts />
        }
      ]
    },
    {
      path:'/admin',
      element:<AminDashboardProtect><AdminDashboard /></AminDashboardProtect>,
    },
    {
      path:'/updateproduct/:id',
      element:<AminDashboardProtect><UpdateProduct /></AminDashboardProtect>,
    },
    {
      path:'/createpro',
      element:<AminDashboardProtect><CreateProduct /></AminDashboardProtect>
    },
    {
      path:'/sendemailforresetpassword',
      element:<VerifyResetPassword />
    }
    
  ])

export {router}