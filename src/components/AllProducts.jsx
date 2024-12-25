import React, { useEffect, useState } from 'react'
import { useGetShoesQuery } from '../services/Shoes';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addToCart } from '../services/ShoeSlicer';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';


function AllProducts() {
  let [cartAdded, setCartAdded] = useState(false);
  let { data, error, isLoading } = useGetShoesQuery();
  let [colors, setColors] = useState('all');
  let [category, setCategory] = useState('');
  let [filterShoe, setFilterShoe] = useState([]);
  let [selectedColors, setSelectedColors] = useState('all')
  let [selectedCategories, setSelectedCategories] = useState('all')
  let [selectedPrice, setSelectedPrice] = useState('all');
  const ProductDiv = styled.div`
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    gap:1rem;
`

  const ProductImage = styled.img`
    height:200px;
    width:200px;
`

  const dispatch = useDispatch();

  useEffect(() => {
    setFilterShoe(data?.message);
  }, [])

  if (isLoading) {
    return <div>Loading....</div>
  }
  if (error) {
    return <div>Error:</div>
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setCartAdded(false);
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
  // let filterShoe=colors === 'all' ? data?.message : data?.message.filter((field)=>{
  //     return field.color == colors 
  // })
  // filterShoe = data?.message.filter((field)=>{
  //   return field.category == category;
  // })

  const handleColors = (e) => {
    setSelectedCategories(null);
    setSelectedPrice(null);
    setSelectedColors(e.target.value);
    const val = e.target.value;
    let filterShoes = val === 'all' ? data?.message : data?.message.filter((field) => {
      return field.color == val
    })
    setFilterShoe(filterShoes);

  }

  const handleCategories = (e) => {
    setSelectedColors(null);
    setSelectedPrice(null);
    setSelectedCategories(e.target.value);
    const val = e.target.value;
    let filterShoes = val === 'all' ? data?.message : data?.message.filter((field) => {
      return field.category == val
    })
    setFilterShoe(filterShoes)
  }

  const handlePrice = (e) => {
    setSelectedCategories(null);
    setSelectedColors(null);
    setSelectedPrice(e.target.value);
    let filterShoes;
    if (e.target.value == "lowest") {
      filterShoes = data?.message.filter((field) => {
        return field.price < 200
      })
    }

    if (e.target.value == "highest") {
      filterShoes = data?.message.filter((field) => {
        return field.price > 200
      })
    }

    setFilterShoe(filterShoes)
  }

  const handleSearch=(e)=>{
    let val=e.target.value;
    let filterShoes=data?.message.filter((field)=>{
      return (field.productname).includes(val);
    })
    setFilterShoe(filterShoes);
  }




  // console.log(filterShoe);        
  return (
    <div>
      <div>
        <h1 className='text-[3rem] text-purple-700 font-bold text-center'>Shoes</h1>
      </div>
      <div className='absolute right-[1rem] top-[10vh]'>
      <TextField
          label='search'
          id='search'
          defaultValue=''
          variant='standard'
          onChange={handleSearch}
        />
      </div>
      <div className='flex gap-[1rem]'>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">filter by colors</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={selectedColors}
            name="radio-buttons-group"
            onChange={handleColors}
          >
            <FormControlLabel value="all" control={<Radio />} label="all" />
            <FormControlLabel value="Blue" control={<Radio sx={{
              '& .MuiRadio-root': {
                backgroundColor: 'blue',
              },
            }} />} label="Blue" style={{ color: 'blue' }} />
            <FormControlLabel value="Black" control={<Radio />} label="Black" style={{ color: 'black' }} />
            <FormControlLabel value="Red" control={<Radio />} label="Red" style={{ color: 'red' }} />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label" className='text-blue-700'>filter by category</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={selectedCategories}
            name="radio-buttons-group"
            onChange={handleCategories}
          >
            <FormControlLabel value="Running" control={<Radio />} label="Running" />
            <FormControlLabel value="Casual" control={<Radio />} label="Casual" />
            <FormControlLabel value="Training" control={<Radio />} label="Training" />
            <FormControlLabel value="Skateboarding" control={<Radio />} label="Skateboarding" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label" className='text-blue-700'>filter by price</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={selectedPrice}
            name="radio-buttons-group"
            onChange={handlePrice}
          >
            <FormControlLabel value="lowest" control={<Radio />} label="lowest" />
            <FormControlLabel value="highest" control={<Radio />} label="highest" />
          </RadioGroup>
        </FormControl>
      </div>

      <Snackbar
        open={cartAdded}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Shoe Added in Cart"
        action={action}
      />
      <ProductDiv>

        {
          filterShoe && filterShoe.map((element, index) => {
            return <Card>
              <CardMedia sx={{ height: 140, width: 350 }} image={element.image} alt="shoe" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {element.productname}
                </Typography>
                <Typography gutterBottom variant="h5" component="div"></Typography>
                <p>{element.price}</p>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {element.description}
                </Typography>
                <h2>{element.category}</h2>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => { dispatch(addToCart(element)); setCartAdded(true) }}>Add To Cart</Button>
                {/* <Button size="small">Learn More</Button> */}
              </CardActions>

            </Card>
          })
        }
      </ProductDiv>
    </div>
  )
}

export default AllProducts