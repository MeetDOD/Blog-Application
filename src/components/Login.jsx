import React, { useState } from 'react';
import { sendLogin } from '../Services/api';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [issignup, setissignup] = useState(true);

  const onResReceived = (data) => {
    if (issignup) {
      localStorage.setItem("userId", data.user._id);
    } else {
      localStorage.setItem("userId", data.id);
    }
    dispatch(authActions.login())
    navigate('/diaries')
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (issignup) {
      sendLogin(true, inputs)
        .then(onResReceived)
        .catch((err) => console.log(err));
    } else {
      sendLogin(false, inputs)
        .then(onResReceived)
        .catch((err) => console.log(err));
      Swal.fire({
        title: 'Invalid Cradentials',
        icon: 'error',
        toast: true,
        timer: 3000,
        position: 'bottom-left',
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  }

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


  return (
    <Box width="50%"
      margin='auto'
      padding='auto'
      marginTop={6}
      marginBottom={6}
    >
      <form>
        <Box display="flex" flexDirection={"column"}>
          <Typography textAlign={'center'} variant='h3' fontFamily={'quicksand'} padding={1}>{issignup ? "💳Signup🪪" : "🔐Login🛡️"}</Typography>
          {issignup && (
            <>
              <TextField value={inputs.name} name='name' onChange={handleChange} id='outlined-text-input' label='Name' type='text' margin="normal" />
            </>
          )}
          <TextField type='email' value={inputs.email} name='email' onChange={handleChange} id='outlined-email-input' label='Email' margin="normal" />
          <TextField type="password" value={inputs.password} name='password' onChange={handleChange} id="outlined-password-input" margin="normal" label="Password" />
          <Button onClick={handleLogin} variant='contained'>{issignup ? "Signup" : "Login"}</Button>
          <Button sx={{ mt: 2 }} variant='outlined' onClick={() => setissignup(!issignup)} >{issignup ? "Login" : "Signup"}</Button>
        </Box>
      </form>
    </Box>
  )
}

export default Login