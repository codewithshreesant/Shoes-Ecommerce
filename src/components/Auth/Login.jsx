// import React from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { showLogout } from '../showLogout';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
function Login() {
    let [isLogin, setIsLogin]=React.useState(false);
    let [login,setLogin]=React.useState({
        email:'',
        password:''
    })

    let [error,setError]=React.useState({});

    const validate=()=>{
        let error={};
        if(!login.email){
            error.email='email is required'
        }
        if(!login.password){
            error.password='password is required'
        }
        if(login.password.length < 6){
            error.password='password must be atleast 6 characters'
        }

        if(login.email && !/\S+@\S+\.\S+/.test(login.email)){
            error.email='Email is invalid'
        }
        setError(error)

        return Object.keys(error).length===0
    }

    let handleChange=(e)=>{
        setLogin({...login,[e.target.id]:e.target.value})
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsLogin(false);
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

    let handleSubmit=async (e)=>{ 
        e.preventDefault()
        if(validate()){
            console.log(login)
            try { 
              const response = await axios.post('http://localhost:5000/api/user/login', login, { 
              headers: { 'Content-Type': 'application/json' } 
            }); 

              if (response.status === 200) { 
                console.log(response.data); 
                const token=response.data.message.accessToken;
                localStorage.setItem('token',token);
                console.log('User logged in successfully'); 
                setIsLogin(true);
              }
        }catch (error) { 
            console.error('There was an error!', error); 
        }
        
    }
}

  return (
    <div>
        <Box
        component="form"
        noValidate
        autoComplete='off'
        className="h-[80vh] flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
        >
            <div>
                <h1 className='font-bold text-[1.5rem]'>Login</h1>
            </div>
            <div>
                <TextField
                error={error?.email?'error':null} 
                label='email'
                id='email'
                defaultValue={login.email}
                variant='standard'
                onChange={handleChange}
                helperText={error?.email?<span className='text-red-500'>{error.email}</span>:null}
                >

                </TextField>
            </div>
            <div>
                <TextField
                error={error?.password?'error':null}
                label='password'
                id='password'
                defaultValue={login.password}
                variant='standard'
                onChange={handleChange}
                helperText={error?.password?<span className='text-red-500'>{error.password}</span>:null}
                />
            </div>
            <Stack spacing={2} direction='column' className='mt-4'>
                <Button variant='contained' type='submit'>Login</Button>
                <p>forgot password <span className='text-blue-800'>
                    <NavLink to='/sendemailforresetpassword'>click here</NavLink>
                </span></p>
                <p>don't have an account <span className='text-blue-800'><NavLink to='/register'>register Now</NavLink></span></p>
            </Stack>
            <Snackbar
                open={isLogin}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Login Successfull"
                action={action}
            />
        </Box>
    </div>
  )
}


export default Login