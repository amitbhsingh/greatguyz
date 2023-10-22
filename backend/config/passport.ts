import passport from 'passport';
import mongoose from 'mongoose';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user'; // Adjust path as per your project structure
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv, { config } from 'dotenv'
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists in our database
    let user = await User.findOne({ googleId: profile.id }).exec();

    if (!user) {
      // If not, create a new user in the database
      user = new User({
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        email: profile.emails?.[0]?.value,
        photo: profile.photos?.[0]?.value
      });
      await user.save();
    }

    // Return user
    done(null,user);
  } catch (error) {
    done(typeof error);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user._id); // Here, we are storing only the user's ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user); // Here, we are retrieving the full user object from the database using the ID stored in the session
  } catch (error) {
    done(error);
  }
});
