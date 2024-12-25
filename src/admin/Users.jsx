import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Users() {
    let [allUsers, setAllUsers]=useState([]);
    const getUsers=async ()=>{
        try {
            const allusers=await  axios.get('http://localhost:5000/api/user/all',{
                header:{
                    'Content-Type':'application/json'
                }
            })
            // console.log("all users data ",allusers);
            const data=allusers.data.message;
            setAllUsers(data);
        } catch (error) {
            console.log("error occured ", error);
        }
    }

    const handleLogOut = async (refreshToken) => {
        try {
          const response=await axios.post('http://localhost:5000/api/user/logoutUser', {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}`
            }
          })
          
          if (response.status === 200) {
            console.log(response.data)
            console.log('User logged out successfully')
            localStorage.removeItem('token')
          
            // navigate('/login')
          } 
        } catch (error) {
          console.log('There was an error!', error)
        }
      }

    useEffect(()=>{
        getUsers();
    },[])
  return (
    <div>
        <h1>
            Users data :
            <table>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>email</th>
                        <th>isAdmin</th>
                        <th>isVerified</th>
                        <th>createdAt</th>
                        <th>isLoggedIn</th>
                        <th> actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers && allUsers.map((element, index)=>{
                            return <tr>
                                <td>{element.username}</td>
                                <td>{element.email}</td>
                                <td>{Number(element.isAdmin)==1?'true':'false'}</td>
                                <td>{Number(element.isVerified)==1?'true':'false'}</td>
                                <td>{element.createdAt}</td>
                                <td>{!element.refreshToken?'false':'true'}</td>
                                <td>
                                    <button onClick={()=>handleLogOut(element.refreshToken)}>logout</button>
                                    <button>delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </h1>
    </div>
  )
}


export default Users  