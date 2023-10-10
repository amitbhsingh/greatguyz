import User from '../models/user'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import { Document } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Try to find an existing user with the Google ID
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // User exists, pass the user to the done callback
        done(null, existingUser);
      } else {
        // User doesn't exist, create a new user
        const newUser = await new User({
          googleId: profile.id,
          // other fields like name, email can also be saved depending on your User schema
          // example: name: profile.displayName, email: profile.emails[0].value, etc.
        }).save();
        done(null, newUser);
      }
    } catch (error) {
    //   done(error, null);
    }
  }
));
// Your routes here
