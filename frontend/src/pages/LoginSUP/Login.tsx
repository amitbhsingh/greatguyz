import axios from 'axios'
import './login.css'
import React, { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleGoogleLogin = () => {
    // Redirect to the backend Google authentication route
    window.location.href = "http://localhost:3000/auth/google";
};


  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      // Send a POST request to your backend for login
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
        <a className="btn-google" href="/login/federated/google"><GoogleIcon /> Sign in with Google</a>
        {/* <button className='login-button' type="button" onClick={handleGoogleLogin} > Join Us With Google</button> */}
        <button className='login-button' type="button"> <FacebookIcon /> Join Us With Facebook </button>
        
      </form>
    </div>
  );
};

export default Login;
