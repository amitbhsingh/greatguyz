
import './signup.css'
import React, { useState } from 'react';
// import {Link} from 'react-router-dom'
import axios from 'axios';




// interface SignUpProps {
//   onSignUp: (email: string, password: string) => void;
// }

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:3000/', {name, email, password})
    .then((result: any) => console.log(result))
    .catch((err: any)=> console.log(err))
  };


  return (
    <>
    <h2 className='signuph2'>Sign Up</h2>
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-group">
          {/* <label className='textlabel'>Name :</label> */}
          <input 
            type="text"
            placeholder='First Name' 
            name="name"
            className='form-control rounded-0'
            onChange={(e) => setName(e.target.value)} 
            />
          {/* <label className='textlabel'>Email :</label> */}
          <input 
            type="text"
            placeholder='Email' 
            name="email"
            className='form-control rounded-0'
            onChange={(e) => setEmail(e.target.value)} 
            />
          {/* <label className='textlabel'>Password:</label> */}
          <input 
            type="text"
            placeholder='Password' 
            name="password"
            className='form-control rounded-0'
            onChange={(e) => setPassword(e.target.value)} 
            />
        </div>
        <button className='signup-button' type="submit">Sign Up</button>
      </form>
    </div>
    </>
  );
};

export default SignUp;
