import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Alert from '@mui/material/Alert';

function VerifyResetPassword() {
    let [email, setEmail]=useState('');
    let [showAlert, setShowAlert]=useState(false);
    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log("email ",email);
        try{
            const response=await axios.post('http://localhost:5000/api/user/verifyresetpassword', {email});
            console.log("response ", response);
            if(response.status===200)
            {
                setShowAlert(true);
                console.log("response data ",response.data);

            }
        }catch(error){
            console.log("error occured ", error.message);
        }
    }
  return (
    <Box  
        component="form"
        className='h-[70vh] flex flex-col justify-center items-center gap-10'
        onSubmit={handleSubmit}
    >
        <TextField  required
          id="email"
          label="email"
          defaultValue={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <Stack className='w-[12vw]'>
            <Button variant='contained' color='secondary' type='submit'>Send</Button>
        </Stack>
        {showAlert ? <Alert severity="success">Reset Password Link send to  your email, check your email</Alert> : ''}
    </Box>

  )
}

export default VerifyResetPassword