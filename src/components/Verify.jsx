import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import  axios from "axios"
import Alert from '@mui/material/Alert';


function Verify() {
    let [isVerified, setIsVerified]=useState(false);
    const {token}=useParams();
    const navigate=useNavigate();
    const verifyEmail=async ()=>{
      const response=await axios.post('http://localhost:5000/api/user/verifyemail',{},{
        headers:{
          'Authorization':`Bearer ${token}` 
        }
      })
      console.log("response ",response);
      if(response.status === 200)
      {
        setIsVerified(true);
        setTimeout(()=>{
          navigate('/');
        },2000)
      }
    }

  return (
    <div className='w-[20vw]'>
        <p>{token}</p>
        <button className='py-[0.5rem] px-[0.8rem] bg-purple-600  font-bold ' onClick={verifyEmail}>Verify</button>
        {isVerified ? <Alert severity="success">Verified Successfully</Alert> : ''}
    </div>
  )
}

export default Verify