import Button from '@mui/material/Button'; 
import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'; 
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';  

function ResetPassword() {
    const {token}=useParams();
    let [reset, setReset]=useState();
    let [pass, setPass]=useState({
      newPassword:'',
      confirmNewPassword:''
    })

    const handleChange=(e)=>{
      setPass({...pass,[e.target.id]:e.target.value});
    }

    const handleSubmit=async (e)=>{
      e.preventDefault();
      console.log(pass);
      try {
        const response=await axios.post('http://localhost:5000/api/user/resetpassword', pass,{
          headers:{
            'Authorization':`Bearer ${token}`
          }
        });
        console.log("response ", response);
        if(response.status===200)
        {
          setReset(true);
          console.log('respose data ', response.data);
        }
      } catch (error) {
        console.log("error occured ",  error.message);
      }
    }

  return (
    <div>
        {/* <form> */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            className='h-[60vh] flex flex-col justify-center items-center  gap-[0.5rem]'
          >
            {/* <div className='flex flex-col gap-[0.5rem]'> */}
              <TextField label="New Password" defaultValue={pass.newPassword} id="newPassword" onChange={handleChange}/>
              <TextField label="Confirm New Password" defaultValue={pass.confirmNewPassword} id="confirmNewPassword" onChange={handleChange}/>
              <Stack>
              <Button variant="contained" color="secondary" type="submit">Reset Password</Button>
              </Stack>
            {/* </div> */}
            {reset ? <Alert severity="success"> Password Reset Successfully </Alert> :''} 
          </Box>

        {/* </form> */}
    </div>
  )
}

export default ResetPassword