import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
export default function TextFieldSizes() {
    let [registration, setRegistration]=React.useState(false);
    let [register,setRegister]=React.useState({
        username:'',
        email:'',
        password:''
    })

    let [error,setError]=React.useState({});

    const validate=()=>{
        let error={};
        if(!register.username){
            error.username='username is required'
        }
        if(!register.email){
            error.email='email is required'
        }
        if(!register.password){
            error.password='password is required'
        }
        if(register.password.length < 6){
            error.password='password must be atleast 6 characters'
        }

        if(register.email && !/\S+@\S+\.\S+/.test(register.email)){
            error.email='Email is invalid'
        }
        setError(error)

        return Object.keys(error).length===0
    }

    let handleChange=(e)=>{
        setRegister({...register,[e.target.id]:e.target.value})
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setRegistration(false);
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
            console.log(register)
            try { 
              const response = await axios.post('http://localhost:5000/api/user/create', register, { 
              headers: { 'Content-Type': 'application/json' } 
            }); 

              if (response.status === 200) { 
                console.log(response.data); 
                console.log('User created successfully'); 
                setRegistration(true);
               
              }
            }catch (error) { 
                console.error('There was an error!', error); 
            }
          }
    }

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      className="h-[80vh] flex flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
        <div>
            <h1 className='font-bold text-[1.5rem]'>Register</h1>
        </div>
      <div>
        <TextField
          error={error?.username ? 'error' : ''}
          label="username"
          id="username"
          defaultValue={register.username}
          variant="standard"
          size="small"
          onChange={handleChange}
          helperText={error.username ? error.username : ''}
        />
        
      </div>
      <div>
          <TextField
              error={error?.email ? 'error' : ''}
              label='email'
              id="email"
              defaultValue={register.email}
              variant="standard"
              size='small'
              onChange={handleChange}
              helperText={error.email ? error.email : ''}
            />
      </div>
      <div>
        <TextField
          error={error?.password ? 'error' : ''}
          label='password'
          id="password"
          defaultValue={register.password}
          size="small"
          variant="standard"
          onChange={handleChange}
          helperText={error.password ? error.password : ''}
        />
      </div>
      <Stack spacing={2} direction='column'>
      <Button variant="contained" type="submit">Signup</Button>
      <p>Already have an account <span className='text-blue-800'><NavLink to='/login'>Login Now</NavLink></span></p>
      </Stack>
      <Snackbar
        open={registration}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Registration Successfull"
        action={action}
      />
    </Box>
  );
}
