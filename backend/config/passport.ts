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
  clientID: process.env.GOOGLE_CLIENT_ID || '416587268578-p6aoqgvrrm60mchbriivjlh62lgtg312.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
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
    done(null, user);
  } catch (error) {
    done(typeof error);
  }
}));

passport.serializeUser((user: any, done) => {
  console.log("SERIALIZE")
  done(null, user._id); 
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("DESERIALIZE")
    const user = await User.findById(id).exec();
    done(null, user); // Here, we are retrieving the full user object from the database using the ID stored in the session
  } catch (error) {
    console.log("ERROR")
    done(error);
  }
});

 // FACEBOOK AUTHENTICATION WITH PASSPORT COMMENCING HERE 
passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID || '',
    clientSecret: process.env.FACEBOOK_SECRET_KEY || '',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || '',
  },
  async function (accessToken, refreshToken, profile, cb) {
    let user = await fbUser.findOne({ facebookId: profile.id });
    
    if (!user) {
      console.log('Adding new facebook user to DB..');
      console.log('facebook', profile);
      
      user = new fbUser({
        facebookId: profile.id,      // Corrected this line
        name: profile.displayName,
        provider: profile.provider,
        profilePicture: profile.photos ? profile.photos[0].value : undefined
      });
      
      await user.save();
      console.log('user Save', user);
      return cb(null, user);
    } else {
      console.log('Facebook User already exist in DB..');
      return cb(null, user);
    }
  }
));


router.get('/', passport.authenticate('facebook', { scope: ['email','public_profile'] }));

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


// Local strategy with passportjs

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function ( err: typeof , user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

module.exports = router;



