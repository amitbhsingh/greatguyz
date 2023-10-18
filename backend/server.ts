import passport from "passport";
import session from "express-session";
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user'
import './config/passport';  
import connectDatabase from './config/database';
import dotenv from 'dotenv'
dotenv.config();
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


const app = express();

app.use(express.json());
app.use(cors());
app.use(session({
    secret: "SESSION_SECRET",
    resave: false,
    saveUninitialized: false
}));

// passport.use(new GoogleStrategy({
//   clientID: process.env['GOOGLE_CLIENT_ID'],
//   clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
//   callbackURL: 'http://localhost:3000/auth/google/callback'
// }, (accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => any) => {
//   // For now, return the user profile. Later, you can link this with a database.
//   return done(null, profile);
// }));

// // Tell the clubhouse how to remember and recognize our friends:
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));





// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );
// app.get('/auth/google/callback', 
//   passport.authenticate('google', { 
//     successRedirect:'/welcome',
//     failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication, redirect to some success page.
//     res.redirect('http://localhost:5173/#/menu');  // Or wherever you want to redirect after a successful login.
//   });
//   app.get('/welcome', (req, res) => {
//     res.send( 'Welcome to home '  );
//   });


app.use(passport.initialize());
app.use(passport.session());



app.use('/users', userRoutes);


// Connect to MongoDB
connectDatabase();

// ... Rest of your server setup ...


app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.use(express.json());
app.use('/users', userRoutes)
