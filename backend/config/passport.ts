import passport from 'passport';
import mongoose from 'mongoose';
import { Strategy as FacebookStrategy} from 'passport-facebook';
// import bcrypt from 'bcrypt';
import User from '../models/user'; // Adjust path as per your project structure
import fbUser from '../models/fbUser'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import express, {Request, Response}  from 'express'
const router= express.Router();
import { Strategy as LocalStrategy } from 'passport-local';
import dotenv, { config } from 'dotenv'
dotenv.config();

const app=express();
app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: 'http://localhost:3000/auth/google/callback'
  
}, async (accessToken, refreshToken, profile, done) => {
  console.log("Inside Passport Callback");
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
      console.log("About to save user:", user);
      try {
        await user.save();
        console.log("User saved:", user);
     } catch (error) {
        console.error("Error saving user:", error);
     }
    }

    // Return user
    done(null,user);
  } catch (error) {
    done(typeof error);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user._id); 
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user); // Here, we are retrieving the full user object from the database using the ID stored in the session
  } catch (error) {
    done(error);
  }
});

// // FACEBOOK AUTHENTICATION WITH PASSPORT COMMENCING HERE 

passport.use(new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_SECRET_KEY || '',
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || '',
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await fbUser.findOne({
        accountId: profile.id,
        provider: 'facebook',
      });
      if (!user) {
        console.log('Adding new facebook user to DB..');
        console.log('facebook',profile)
        const user = new fbUser({
          accountId: profile.id,
          name: profile.displayName,
          provider: profile.provider,
        });
        await user.save();
        console.log(user);
        return cb(null, profile);
      } else {
        console.log('Facebook User already exist in DB..');
        // console.log(profile);
        return cb(null, profile);
      }
    }
  )
);

router.get('/', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/facebook/error',
  }),
  function (req: Request, res: Response) {
    // Successful authentication, redirect to success screen.
    res.redirect('/auth/facebook/success');
  }
);




// router.get('/success', async (req: Request, res: Response) => {
//   const userInfo = {
//     id: req.session.passport.user.id,
//     displayName: req.session.passport.user.displayName,
//     provider: req.session.passport.user.provider,
//   };
//   res.render('fb-github-success', { user: userInfo });
// });

router.get('/error', (req: Request, res: Response) => res.send('Error logging in via Facebook..'));

router.get('/signout', (req: Request, res: Response) => {
  try {
    req.session.destroy(function (err) {
      console.log('session destroyed.');
    });
    res.render('auth');
  } catch (err) {
    res.status(400).send({ message: 'Failed to sign out fb user' });
  }
});

module.exports = router;