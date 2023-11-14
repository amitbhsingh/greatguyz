import express, {Response, Request} from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import LocalUserData from './models/userdb'
// import mongoose from 'mongoose';
// import User from './models/user';
import './config/passport';  // Assuming you are setting up passport in this file
import bcrypt from 'bcrypt'
import connectDatabase from './config/database';
dotenv.config({ path: './.env-copy' });

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cors({
  origin: 'http://localhost:5173', // or your frontend server's address
  credentials: true  // To support credentials like cookies
}));

// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret', // Use SESSION_SECRET from your .env file, or a default string
  resave: false,
  saveUninitialized: true,
 cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Equals 1 day
  }
}));


// Initialize passport and its session
app.use(passport.initialize());
app.use(passport.session());

// Example of a protected route
app.get('/protected', (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.send('This is a protected route');
  } else {
    res.status(401).send('Not authenticated');
  }
});

// Google authentication routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    // Successful authentication, redirect to your frontend application
    res.redirect('http://localhost:5173/');  // Adjust the URL as needed
  }
);



//Facebook authentication
app.get('/auth/facebook',
  passport.authenticate('facebook', {scope: 'email'} ));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:5173/');
  });

  app.post('/register', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req: Request, res: Response) {
    res.redirect('/');
  });

  app.post('/register', (req: Request, res: Response)=> {
    LocalUserData.create(req.body)
    .then(employees=>res.json(employees))
    .catch(err=> res.json(err))
  })

  // app.get('/',(req,res)=>{
  //   res.send('<h1>hello </h1>')
  // })
  

// Start the server
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000');
  connectDatabase();  // Connect to MongoDB when the server starts
});


