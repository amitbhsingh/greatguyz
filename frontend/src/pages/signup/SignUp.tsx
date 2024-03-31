import axios from 'axios';
import './signup.css';
import React, { useState } from 'react';
// import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logIn} from '../../features/auth/authSlice'
// import {googleLogIn} from '../../features/auth/authSlice'
const SignUp: React.FC = () => {
  // const [name, setName] = useState<any>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email)

    if (password !== confirmPassword) {
      console.error("Passwords do not match.");
      return;
    }
    

    axios.post('http://localhost:3000/locusers', {
        email,
        password
    })
    .then(response => {
        
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
      {/* <div className='input-group'>
          <label className='emailSignup'>First Name</label>
          <input type="text" className='emailinSignup' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
        </div> */}
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
        <button type="submit" className='signup-button'>Sign Up <PersonAddIcon /></button>
        <a className="btn-googleSignup" href="http://localhost:3000/auth/google"><GoogleIcon /> Signup with Google</a>
      
      </form>
    </div>
  );
};

export default SignUp;
