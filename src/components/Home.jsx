import React, { useState } from 'react'
import '../index.css';
import './card.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button, CardActions, Snackbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { postDelete } from '../Services/api';

const Home = ({ title, name, description, image, location, date, id, user }) => {

  const [open, setopen] = useState(false)

  const isLogUser = () => {
    if (localStorage.getItem("userId") === user) {
      return true;
    }
    return false;
  }

  const handleDelete = () => {
    postDelete(id)
      .then((data) => console.log(data))
      .catch((er) => console.log(er))

    setopen(true);
  }

  return (
    <>
      <div class="container">
        <div class="card-group vgr-cards">
          <div class="card">
            <div class="card-img-body">
              <img class="card-img"
                src={image}
                alt={title}
                className='imgwid' />
            </div>
            <div class="card-body">
              <Typography sx={{ fontSize: 'h6.fontSize' }}>{title}</Typography>
              <Typography fontWeight={"bold"}>Author : {name}</Typography>
              <Typography fontWeight={"bold"}>Location : {location}</Typography>
              <Typography class="card-text" fontWeight={"bold"}>Posted : {date}</Typography>
              <Typography class="card-text">{description}</Typography>
              {isLogUser() && (
                <CardActions>
                  <Button variant="outlined"  ><Link style={{ textDecoration: 'none' }} to={`/posts/${id}`} ><EditIcon /></Link></Button>
                  <Button color="error" variant="outlined" onClick={handleDelete}><DeleteIcon /></Button>
                </CardActions>
              )}
              <Snackbar open={open} autoHideDuration={4000} onClose={() => setopen(false)}>
                <Alert onClose={() => setopen(false)} severity="success" sx={{ width: '100%' }}>
                  Post Deleted Successfully !
                </Alert>
              </Snackbar>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
