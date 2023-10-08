// src/SignUp.tsx
import './signup.css'
import React, { useState } from 'react';

interface SignUpProps {
  onSignUp: (email: string, password: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(email, password);
  };

  return (
    <>
    <h2 className='signuph2'>Sign Up</h2>
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-group">
          <label className='textlabel'>Name :</label>
          <input placeholder='First Name' className='signupname' type="fname" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className='textlabel'>Last Name :</label>
          <input placeholder='Last Name' className='singuplname' type="lname" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className='textlabel'>Email:</label>
          <input placeholder='Email' className='signupemail' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label  className='textlabel' >Password:</label>
          <input placeholder='Password' className='singuppassword' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className='signup-button' type="submit">Sign Up</button>
      </form>
    </div>
    </>
  );
};

export default SignUp;
