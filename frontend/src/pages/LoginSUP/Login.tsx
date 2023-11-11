import axios from 'axios'
import './login.css'
import React, { useState, useEffect } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';

import { useAppSelector } from '../../hooks'

import { selectIsAuthenticated } from '../../features/auth/authSlice'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      axios.post('http://localhost:3000/users/login', {
          email: email,
          password: password
      })
      .then(response => {
          console.log(response.data);
          // Handle successful login here, e.g., store JWT, redirect, etc.
      })
      .catch(error => {
          console.error('Login error', error);
      });
  };


  return (
    <div>
      <h2 className='logintext'>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='input-group'>
          <label className='emailLogin' >Email </label>
          <input className='emailin' placeholder='User Name' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          
        </div>
        <div className='input-group'>
          <label className='emailLogin' >Password </label>
          <input className='emailin' placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className='login-button' type="submit" >  Login <LoginIcon /></button>
        <a className="btn-google" href="http://localhost:3000/auth/google"><GoogleIcon /> Login with Google</a>
        {/* <button className='login-button' type="button" onClick={handleGoogleLogin} > Join Us With Google</button> */}
        <a className="btn-facebook" href="http://localhost:3000/auth/facebook"> <FacebookIcon /> Login with Facebook</a>
      </form>
    </div>
  );
};

export default Login;
