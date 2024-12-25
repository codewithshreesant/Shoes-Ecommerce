
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetShoeQuery } from '../services/Shoes';
import { use } from 'react';
import { useUpdatShoeMutation } from '../services/Shoes';
function UpdateProduct() {
    let { id } = useParams();
    let { data, error, isLoading } = useGetShoeQuery(id);
    console.log("data update ", data);
    let [imgsrc, setImgSrc] = useState();

    const [updateShoe, { isSuccess, isError }] = useUpdatShoeMutation();
    // const { mutate: updateShoe, isSuccess, isError } = useUpdatShoeMutation();
    // let [imageFile, setImageFile]=useState();
    let navigate = useNavigate();
    let [updateProduct, setUpdateProduct] = useState(
        {
            productname: '',
            price: '',
            description: '',
            category: '',
            rating: '',
            image: '',
            stock: ''
        }
    );

    useEffect(() => {
        setUpdateProduct({
            ...updateProduct, productname: data?.message.productname,
            price: data?.message.price, description: data?.message.description, category: data?.message.category,
            rating: data?.message.rating, image: data?.message.image, stock: data?.message.stock
        })
    }, [data])
    // console.log("single data ",data);
    const handleChange = (e) => {
        setUpdateProduct({ ...updateProduct, [e.target.id]: e.target.value });
    }

    const handleImage = (e) => {
        // console.log("image path ", e.target.files[0]);
        
        setUpdateProduct({ ...updateProduct, image: e.target.files[0] });
        // setImgSrc(URL.createObjectURL(e.target.files[0]));

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("update product", updateProduct);
        console.log("img src ", imgsrc);

        const { productname, price, rating, description, stock, category, image } = updateProduct;

        const formData = new FormData(); 
        formData.append('productname', productname); 
        formData.append('price', price); 
        formData.append('rating', rating); 
        formData.append('description', description);
        formData.append('stock', stock); 
        formData.append('category', category); 
        formData.append('image', image);
        // setUpdateProduct({...formData});

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        console.log("id from data message ", data?.message._id);

        const response=await updateShoe({id:data?.message._id, shoe:formData});
        console.log(response);
        if(response.data.statusCode===200){
            console.log('Product updated successfully');
            navigate('/admin');
        }



    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productname">Product Name</label>
                    <input type="text" id='productname' value={updateProduct.productname} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="text" id='price' value={updateProduct.price} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="text" id='price' value={updateProduct.rating} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" id='description' value={updateProduct.description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" id='category' value={updateProduct.category} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <input type="text" id='stock' value={updateProduct.stock} onChange={handleChange} />
                </div>
                <div>

                    <input type="file" onChange={handleImage} />
                    <img src={updateProduct.image} alt="image" />

                </div>
                <button type='submit' className='px-[1.6rem] py-[0.7rem] my-[1rem] rounded bg-purple-800 text-white font-bold'>Update</button>
            </form>
        </div>
    )
}

export default UpdateProduct