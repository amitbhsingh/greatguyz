import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';

import './config/passport';  // Assuming you are setting up passport in this file
import connectDatabase from './config/database';

dotenv.config();
connectDatabase()

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // or your frontend server's address
  credentials: true  // To support credentials like cookies
}));

// It's important to use express.json() if you plan to send/receive JSON payloads
app.use(express.json());

// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret', // Use SESSION_SECRET from your .env file, or a default string
  resave: false,
  saveUninitialized: false
}));

// Initialize passport and its session
app.use(passport.initialize());
app.use(passport.session());

// Example of a protected route
app.get('/protected', (req, res) => {
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
  (req, res) => {
    // Successful authentication, redirect to your frontend application
    res.redirect('http://localhost:5173/#/menu');  // Adjust the URL as needed
  }
);

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
  connectDatabase();  // Connect to MongoDB when the server starts
});
