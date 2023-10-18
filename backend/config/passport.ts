import passport from 'passport';
import mongoose from 'mongoose';
import router from '../routes/user';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user'; // Adjust path as per your project structure
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv, { config } from 'dotenv'
dotenv.config();






passport.use(new LocalStrategy({
    usernameField: 'email',  // The name of the email input field
    passwordField: 'password'  // The name of the password input field
}, async (email, password, done) => {
    try {
        // Look up the user by email
        const user = await User.findOne({ email: email }).exec();

        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }

        // Check if hashed password matches the one in the database
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        // Successful authentication, return user
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  


// passport.use(new GoogleStrategy({
//   clientID: 'process.env.GOOGLE_CLIENT_ID',
//   clientSecret: 'process.env.GOOGLE_CLIENT_SECRET',
//   callbackURL: 'http://localhost:3000/auth/google/callback'
// }, (accessToken, refreshToken, profile, done) => {
//   // For now, return the user profile. Later, you can link this with a database.
//   return done(null, profile);
// }));

// // Tell the clubhouse how to remember and recognize our friends:
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));
