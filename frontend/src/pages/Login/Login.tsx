import axios from 'axios'
import './login.css'
import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logIn} from '../../features/auth/authSlice'



const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch=useDispatch();
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      // Send a POST request to your backend for login
      axios.post('http://localhost:3000/login', {
        email,
        password,
    }, {
      withCredentials:true
    })
    .then(response => {
        console.log(response);
        dispatch(logIn(response.data.user));
        navigate('/member');
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
        
      </form>
    </div>
  );
};

export default Login;
