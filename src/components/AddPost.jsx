import React, { useState } from 'react';
import { addPost } from '../Services/api';
import { Button, Typography, Snackbar, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddPost = () => {

  const navigate = useNavigate();
  const [open, setopen] = useState(false)
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    location: '',
    image: '',
    date: ''
  });

  const onResReceived = (data) => {
    navigate("/diaries");
    Swal.fire({
      title: 'Post added successfully',
      icon: 'success',
      toast: true,
      timer: 3000,
      position: 'bottom-left',
      timerProgressBar: true,
      showConfirmButton: false
    });
  }

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const submit = (e) => {
    e.preventDefault();
    addPost(inputs)
      .then(onResReceived)
      .catch((er) => console.log(er))
  }

  return (
    <>
      <div>
        <Typography textAlign={'center'} variant='h3' fontFamily={'quicksand'} padding={1}>
          🗽Add Post📷
        </Typography>
        <div class="px-5 mx-5">
          <label for="exampleInputEmail1" class="form-label">Title</label>
          <input type="text" onChange={handleChange} name="title" value={inputs.title} class="form-control" />
        </div>
        <div class="px-5 mx-5 py-2">
          <label for="exampleInputEmail1" class="form-label">Description</label>
          <input type="text" onChange={handleChange} name="description" value={inputs.description} class="form-control" />
        </div>
        <div class="px-5 mx-5 py-2">
          <label for="exampleInputEmail1" class="form-label">Location</label>
          <input type="text" onChange={handleChange} name="location" value={inputs.location} class="form-control" />
        </div>
        <div class="px-5 mx-5 py-2">
          <label for="exampleInputEmail1" class="form-label">Image Url</label>
          <input type="text" onChange={handleChange} name="image" value={inputs.image} class="form-control" />
        </div>
        <div class="px-5 mx-5 py-2">
          <label for="exampleInputEmail1" class="form-label">Date</label>
          <input type="date" onChange={handleChange} name="date" value={inputs.date} class="form-control" />
        </div>
        <div className='pt-3'>
          <Snackbar open={open} autoHideDuration={4000} onClose={() => setopen(false)}>
            <Alert onClose={() => setopen(false)} severity="success" sx={{ width: '100%' }}>
              Post Added Successfully !
            </Alert>
          </Snackbar>
          <Box textAlign='center'>
            <Button variant="contained" onClick={submit} >Post Now</Button>
          </Box>
        </div>
      </div>
    </>
  )
}

export default AddPost
