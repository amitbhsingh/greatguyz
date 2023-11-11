import axios from 'axios'
import './signup.css'  // Note: You will need to create or modify a 'signup.css' for styling
import React, { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {Link, useNavigate} from 'react-router-dom';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const navigate=useNavigate()


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation to ensure password and confirm password match
    if (password !== confirmPassword) {
      console.error("Passwords do not match.");
      return;
    }

    // Send a POST request to your backend for signup
    axios.post('http://localhost:3000/register', {
        email,
        password
    })
    .then(response => {
        console.log(response);
        navigate('/login')
        // Handle successful signup here, e.g., store JWT, redirect, etc.
    })
    .catch(error => {
        console.error('Signup error', error);
    });
  };

  return (
    <div>
      <h2 className='signuptext'>Sign Up</h2>
      <form action="login" method='post' className='signup-form' onSubmit={handleSubmit}>
        <div className='input-group'>
          <label className='emailSignup' >Email </label>
          <input type="email" className='emailinSignup' placeholder='Enter Name' value={email} onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className='input-group'>
          <label className='passwordSignup' >Password </label>
          <input type='password' className='passwordinSignup' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </div>
        <div className='input-group'>
          <label className='confirmPasswordSignup'>Confirm Password </label>
          <input type='password' className='confirmPasswordinSignup' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
        </div>
        <Link to='login' className='signup-button' type="submit" >  Signup <PersonAddIcon /></Link>
        <a className="btn-googleSignup" href="http://localhost:3000/auth/google/signup"><GoogleIcon /> Signup with Google</a>
        <a className="btn-facebookSignup" href="http://localhost:3000/auth/facebook/signup"> <FacebookIcon /> Signup with Facebook</a>
      </form>
    </div>
  );
};

export default SignUp;
