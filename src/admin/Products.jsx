import React from 'react'
import { useDeleteShoeMutation, useGetShoesQuery } from '../services/Shoes';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
function Products() {
    const {data, error, isLoading} = useGetShoesQuery();
    console.log(data);

  return (
    <div>
        <Stack direction="row" spacing={2}>
        <Button variant="outlined">
           <NavLink to='/createpro'>create +</NavLink> 
        </Button>
        </Stack>
        {
            isLoading ? 'Loading...' : 
            error ? error.message : 
            <TableContainer>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Image</TableCell>
                        <TableCell align="right">Stock</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data && data?.message.map((shoe) => (
                            <TableRow key={shoe._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{shoe.productname}</TableCell>
                                <TableCell align="right">{shoe.price}</TableCell>
                                <TableCell align="right">{shoe.description}</TableCell>
                                <TableCell align="right">{shoe.category}</TableCell>
                                <TableCell align="right">
                                    <img src={shoe.image} alt='shoe' style={{width: '50px', height: '50px'}}/>

                                </TableCell>
                                <TableCell align="right">{shoe.stock}</TableCell>
                                <TableCell align="right">
                                    <button>
                                      <NavLink to={`/updateproduct/${shoe._id}`}>Edit</NavLink>  
                                    </button>
                                    <button>
                                       <NavLink to={()=>useDeleteShoeMutation(shoe._id)}>Delete</NavLink> 
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>    
                </Table>
            </TableContainer>
}
            {/* data && data?.message.map((shoe) => (
                <div key={shoe._id}>
                    <h1>{shoe.name}</h1>
                    <p>{shoe.price}</p>
                </div> */}
            {/* )) */}
        
    </div>
  )
}


export default Products