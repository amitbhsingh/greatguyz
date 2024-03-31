import passport from 'passport';
import GoogleUser from '../models/user'; // Adjust path as per your project structure
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import express from 'express'
const router= express.Router();
import dotenv, { config } from 'dotenv'
// import  jwt from "jsonwebtoken"
dotenv.config();

const app=express();

app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: 'http://localhost:3000/auth/google/callback'
  
}, async (accessToken, _refreshToken, profile, done) => {
  console.log("Inside Passport Callback");
  try {
    // Check if user already exists in our database
    let user = await GoogleUser.findOne({ email: profile.emails }).exec();

    if (!user) {
      // If not, create a new user in the database
        user = new GoogleUser({
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        email: profile.emails?.[0]?.value,
        photo: profile.photos?.[0]?.value,
        accessToken
      });
      await user.save();
      try {
        await user.save();
        // const token= await jwt.sign{}
        console.log("User saved:", user);
     } catch (error) {
        console.error("Error saving user:", error);
     }
    }

    // Return user
    done(null, user);
  } catch (error) {
    done(typeof error);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user._id); 
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("DESERIALIZE")
    const user = await GoogleUser.findById(id).exec();
    done(null, user); // Here, we are retrieving the full user object from the database using the ID stored in the session
  } catch (error) {
    console.log("ERROR")
    done(error);
  }
});


module.exports = router;




// import passport from 'passport'
// import GoogleStrategy from 'passport-google-oauth20'
// import mongoose from 'mongoose'

// const User = mongoose.model('User')

// // Is ran after auth/google/callback. Places the MongoDB _id in the session
// passport.serializeUser((user, done) => {
//   done(null, user.id) // First argument is error object, id is the MongoDB _id
// })

// // Takes the MongoDB _id from the session and retrieves the User object
// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id)
//   done(null, user)
// })

// export default () =>
//   passport.use(
//     new GoogleStrategy.Strategy(
//       {
//         clientID:
//           process.env.NODE_ENV === 'production'
//             ? process.env.GOOGLE_CLIENT_ID_PROD
//             : process.env.GOOGLE_CLIENT_ID_DEV,
//         clientSecret:
//           process.env.NODE_ENV === 'production'
//             ? process.env.GOOGLE_CLIENT_SECRET_PROD
//             : process.env.GOOGLE_CLIENT_SECRET_DEV,
//         callbackURL: '/api/auth/google/callback',
//         proxy: true,
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         console.log('Access token:', accessToken)
//         console.log('Refresh token:', refreshToken)
//         console.log('Profile:', profile)
//         const existingUser = await User.findOne({ googleId: profile.id })

//         if (existingUser) {
//           return done(null, existingUser)
//         }

//         const user = await new User({
//           googleId: profile.id,
//           name: `${profile.name.givenName} ${profile.name.familyName}`,
//           email: profile.emails[0].value,
//         }).save()

//         done(null, user)
//       }
//     )
//   )