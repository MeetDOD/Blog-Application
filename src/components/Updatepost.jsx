import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetails, postUpdate } from '../Services/api';
import Swal from 'sweetalert2';
import { Typography, Button, Box } from '@mui/material';

const Updatepost = () => {

  const id = useParams().id;
  const [post, setPost] = useState();
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    location: '',
    image: '',
  });

  useEffect(() => {
    getPostDetails(id)
      .then((data) => {
        setPost(data.post)
        setInputs({
          title: data.post.title,
          description: data.post.description,
          image: data.post.image,
          location: data.post.location
        })
      })
      .catch((er) => console.log(er))
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const submit = (e) => {
    e.preventDefault();
    postUpdate(inputs, id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
    Swal.fire({
      title: 'Post Updated successfully',
      icon: 'success',
      toast: true,
      timer: 3000,
      position: 'bottom-left',
      timerProgressBar: true,
      showConfirmButton: false
    });
  }

  return (
    <>
      <div>
        <Typography textAlign={'center'} variant='h3' fontFamily={'quicksand'} padding={1}>
          ✏️ Update Post🧳
        </Typography>
        <div class="px-5 mx-5 py-2">
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
        <div className='pt-3'>
          <Box textAlign='center' >
            <Button variant="contained" onClick={submit} >Update</Button>
          </Box>
        </div>
      </div>
    </>
  )
}

export default Updatepost
