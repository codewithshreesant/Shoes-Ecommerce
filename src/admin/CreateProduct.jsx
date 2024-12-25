import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useCreateShoeMutation } from '../services/Shoes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// import fs from 'fs';
function CreateProduct() {
    const [createShoe, { isLoading, isError }] = useCreateShoeMutation();
    const [file, setFile] = useState();
    const [showImage, setShowImage]=useState();
    let [productData, setProductData] = useState({
        productname: '',
        price: '',
        rating: '',
        description: '',
        stock: '',
        category: '',
        image: ''
    })

    let navigate=useNavigate();

    const handleChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setProductData({ ...productData, [id]: value })
    }

    const handleFileChange = (e) => {
        setProductData({...productData, image:e.target.files[0]});
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        console.log("Product data ", productData);
        console.log("image file  ", productData.image.name);
        const { productname, price, rating, description, stock, category, image } = productData;
        const formData = new FormData(); 
        formData.append('productname', productname); 
        formData.append('price', price); 
        formData.append('rating', rating); 
        formData.append('description', description);
        formData.append('stock', stock); 
        formData.append('category', category); 
        formData.append('image', image);
        
        const response = await createShoe(formData);
        console.log(response);

        if (response.data.statusCode === 200) {
            alert("Product created Successfully ");
            navigate('/admin');
        }

    }

    
 

    return (
        <div>
            <div>
                <h1 className='text-2rem font-bold text-purple-700'>Create new Product </h1>
            </div>
            <Box sx={{ width: 500, maxWidth: '100%' }} component="form" onSubmit={handleSubmit} className='flex flex-col gap-[1rem]'>
                <TextField fullWidth label="productname" defaultValue={productData.productname} id="productname" onChange={handleChange} />
                <TextField fullWidth label="price" defaultValue={productData.price} id="price" onChange={handleChange} />
                <TextField fullWidth label="rating" defaultValue={productData.rating} id="rating" onChange={handleChange} />
                <TextField fullWidth label="description" defaultValue={productData.description} id="description" onChange={handleChange} />
                <TextField fullWidth label="stock" defaultValue={productData.stock} id="stock" onChange={handleChange} />
                <TextField fullWidth label="category" defaultValue={productData.category} id="category" onChange={handleChange} />
                <input type="file" onChange={handleFileChange} />
                <Stack direction="row" spacing={2}>
                <Button variant="contained" type="submit">
                    create Product
                </Button>
            </Stack>
        </Box>
        </div >
    )
}

export default CreateProduct