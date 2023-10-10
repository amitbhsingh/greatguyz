import passport from "passport";
import session from "express-session";
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user'
import './config/passport';  
import connectDatabase from './config/database';

import dotenv from 'dotenv'
dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());
app.use(session({
    secret: "SESSION_SECRET",
    resave: false,
    saveUninitialized: false
}));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to some success page.
    res.redirect('/success');  // Or wherever you want to redirect after a successful login.
  });



app.use(passport.initialize());
app.use(passport.session());



app.use('/users', userRoutes);
app.use(cors());

// Connect to MongoDB
connectDatabase();

// ... Rest of your server setup ...


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
app.get('/', (req, res) => {
  res.send('hello');
});
app.use(express.json());
app.use('/users', userRoutes)
