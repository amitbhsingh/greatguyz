import axios from 'axios';
import './signup.css';
import React, { useState } from 'react';
// import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logIn} from '../../features/auth/authSlice'

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email)

    if (password !== confirmPassword) {
      console.error("Passwords do not match.");
      return;
    }

    axios.post('http://localhost:3000/signup', {
        email,
        password
    })
    .then(response => {
        console.log(response);
        dispatch(logIn(response.data.user));
        navigate('/menu');
    })
    .catch(error => {
        console.error('Signup error', error);
    });
  };

  return (
    <div>
      <h2 className='signuptext'>Sign Up</h2>
      <form className='signup-form' onSubmit={handleSubmit}>
        <div className='input-group'>
          <label className='emailSignup'>Email</label>
          <input type="email" className='emailinSignup' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='input-group'>
          <label className='passwordSignup'>Password</label>
          <input type='password' className='passwordinSignup' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </div>
        <div className='input-group'>
          <label className='confirmPasswordSignup'>Confirm Password</label>
          <input type='password' className='confirmPasswordinSignup' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
        </div>
        <button type="submit" className='signup-button'>Signup <PersonAddIcon /></button>
        <a className="btn-googleSignup" href="http://localhost:3000/auth/google/signup"><GoogleIcon /> Signup with Google</a>
        {/* <a className="btn-facebookSignup" href="http://localhost:3000/auth/facebook/signup"> <FacebookIcon /> Signup with Facebook</a> */}
      </form>
    </div>
  );
};

export default SignUp;
