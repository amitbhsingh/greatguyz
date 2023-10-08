// src/Login.tsx
import './login.css'
import React, { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
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
        <button className='login-button' type="submit">  Login <LoginIcon /></button>
        <button className='login-button' type="submit"><GoogleIcon /> Join Us With Google</button>
        <button className='login-button' type="submit"> <FacebookIcon /> Join Us With Facebook </button>
        
      </form>
    </div>
  );
};

export default Login;
