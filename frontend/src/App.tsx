import {HashRouter, Routes, Route} from 'react-router-dom';
// const express=require('express')
import Menu from './menu/Menu';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs'
import Login from './pages/LoginSUP/Login';
import SignUp from './pages/LoginSUP/SignUp';

// import express, { Request, Response } from 'express';
// import bodyParser from 'body-parser';
// import bcrypt from 'bcryptjs';

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Parse JSON requests
// app.use(bodyParser.json());

// // Simulated user database
// const users: { username: string; password: string }[] = [];

// // Endpoint for login
// app.post('/login', (req: Request, res: Response) => {
//     const { username, password } = req.body;

//     // Find user by username
//     const user = users.find(u => u.username === username);

//     // Check if user exists and password is correct
//     if (user && bcrypt.compareSync(password, user.password)) {
//         res.json({ message: 'Login successful' });
//     } else {
//         res.status(401).json({ message: 'Login failed' });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// const app = express();
// app.set('view engine','ejs')
// app.listen,(5173,()=>{
//   console.log('listening for requests')
// })
export function App() {
  const handleLogin = (email: string, password: string) => {
    // Perform authentication logic here, e.g., call an API
    console.log('Logging in with:', email, password);
  };

  const handleSignUp = (email: string, password: string) => {
    // Perform signup logic here, e.g., call an API
    console.log('Signing up with:', email, password);
  };

  return (
    <>
      <TopBar />
      <Routes>

          <Route path= "/" element = {<Home /> }  />
          <Route path= "menu" element= {<Menu />} />
          <Route path= "contact" element= {<Contact />} />
          <Route path= "about" element= {<AboutUs />} />
          <Route path= "login" element= {<Login onLogin={handleLogin} />} />
          <Route path= "signup" element= {<SignUp onSignUp={handleSignUp} />} />
          <Route path= "*" element= {<NotFound />} />
          
      </Routes>
    </>
  )
}
export function WrappedApp(){
  return ( 
  <HashRouter>
    <App />
  </HashRouter>
  );
}




