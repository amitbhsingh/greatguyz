import { DoneCallback } from "passport";
import { authUser, checkAuthenticated } from "./auth";
import { NextFunction, Request, Response } from "express";
import cors from 'cors';

const express = require('express');
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy

const PORT = 3000

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // or your frontend server's address
  credentials: true  // To support credentials like cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(session({
  secret: "secret",
  resave: false,
  saveUnitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(authUser))

passport.serializeUser((userObj: any, done: DoneCallback) => {
  console.log('SERIALIZE', { userObj })
  done(null, userObj.id)
})

passport.deserializeUser((userObj: any, done: DoneCallback) => {
  console.log('DESERIALIZE', { userObj })
  done(null, userObj)
})

// const printData = (req: Request, res: Response, next: NextFunction) => {
//   console.log(req)
//   next()
// }

app.post('/login', passport.authenticate('local', {
  successRedirect: "/health",
  failureRedirect: "/login",
}))

app.get("/health", (req: Request, res: Response) => {
  console.log("HEALTHY ROUTE")
  console.log('USER:', req.user)
  console.log('SESSION:', req.session)
  // console.log("RESPONSE:", res)
  res.status(200).send("Server is healthy!")
})

app.get("/admin", checkAuthenticated, (req: Request, res: Response) => {
  console.log("ADMIN")
  res.status(200).send("ACCESSED PRIVILEGED PAGE")
})

app.post("/logout", (req: Request, res: Response) => {
  req.logOut((err) => console.log("LOGOUT ERROR:", err))
  res.redirect('/login')
  console.log("LOGGED OUT")
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))

// import express, {Response, Request} from 'express';
// import passport from 'passport';
// import session from 'express-session';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import LocalUserData from './models/userdb'
// import mongoose, { mongo } from 'mongoose';
// import User from './models/user';
// import './config/passport';  // Assuming you are setting up passport in this file
// import connectDatabase from './config/database';
// dotenv.config();
// // connectDatabase()

// const app = express();
// app.use(express.json());

// app.get('/profile', async (req, res) => {
//   const user = await User.findOne({ email: "amit.bh.singh@gmail.com" });
//   res.render('profile', { user });
// });


// app.use(cors({
//   origin: 'http://localhost:5173', // or your frontend server's address
//   credentials: true  // To support credentials like cookies
// }));

// // mongoose.connect("process.env.MONGO_URI")


// // Set up session
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'default_secret', // Use SESSION_SECRET from your .env file, or a default string
//   resave: false,
//   saveUninitialized: false
// }));

// // Initialize passport and its session
// app.use(passport.initialize());
// app.use(passport.session());

// // Example of a protected route
// app.get('/protected', (req: Request, res: Response) => {
//   if (req.isAuthenticated()) {
//     res.send('This is a protected route');
//   } else {
//     res.status(401).send('Not authenticated');
//   }
// });

// // Google authentication routes
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication, redirect to your frontend application
//     res.redirect('http://localhost:5173/menu');  // Adjust the URL as needed
//   }
// );



// //Facebook authentication
// app.get('/auth/facebook',
//   passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('http://localhost:5173/menu');
//   });
// app.post('http://localhost:5173/signup',(req: Request, res: Response)=>{
//   LocalUserData.create(req.body)
//   .then(signup => res.json(signup))
//   .catch( err => res.json(err))
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('server is running on http://localhost:3000');
//   connectDatabase();  // Connect to MongoDB when the server starts
// });

