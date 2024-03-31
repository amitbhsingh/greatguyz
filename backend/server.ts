import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import connectDatabase from './config/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
// import Razorpay from 'razorpay';
// import Admin from './models/admin';
import Checkout from './models/ccheckout';
import Order from './models/orders';
import Products from './models/products';
import { default as GoogleUser, default as Gusers, default as User } from './models/user';
import LocalUser from './models/userdb'; // Corrected import
import './config/passport';


dotenv.config({ path: './.env-copy' });
const router = express.Router();

declare module 'express-session' {
  export interface SessionData {
    originUrl?: string; // Add custom property originUrl, make it optional
  }
}

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup for frontend running on a different port
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Set to true if your frontend should pass cookies to the backend.
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.options('*', cors());

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));


// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Signup route
app.post('/locusers', cors(), async (req: Request, res: Response) => {
  console.log('Signup endpoint hit with data:', req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
    const existingUser = await LocalUser.findOne({ email: email });
        if (existingUser) {
            return res.status(409).send({ message: "User with this email already exists" });
        }
    const hashedPassword = await bcrypt.hash(password, 10);
    const locUserData = new LocalUser({ email, password: hashedPassword });
    await locUserData.save();
    res.status(201).send({ message: "User created successfully", locUserData });
  } catch (error) {
    res.status(500).send({ message: "Error creating user", error });
  }
});

// Login route

app.post('/login', cors(), async (req, res) => {
  const {email,password}=req.body;
  // console.log('Login endpoint hit with data:', req.body);
  try {
    const locUser = await LocalUser.findOne({ email });
    if (!locUser || !(await bcrypt.compare(password, locUser.password))) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }
    // Add your logic here for successful login
    res.status(200).send({ message: "Login successful", locUser });
  } catch (error) {
    res.status(500).send({ message: "Error during login", error });
  }
});


// Google authentication routes
app.get('/auth/google', (req, res, next) => {
  // The referer header contains the URL of the page that led the user here
  const originUrl = req.get('Referer') || 'http://localhost:5173/';
  req.session.originUrl = originUrl;
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});



app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/signup' }),
  async (req: Request, res: Response) => {
    const user = req.user as GoogleUser;
    try {
      // Find the user in the database
      const dbUser = await GoogleUser.findOne({ userId: user.userId });
      if (!dbUser) {
        // If the user doesn't exist in the database, create a new user
        const newUser = new GoogleUser({
          googleId: user.googleId,
          name: user.displayName,
          email: user.emails[0].valueOf,
          image: user.photos[0].valueOf,
        });

        await newUser.save();
        // Redirect to the member page after successful user creation
        res.redirect('http://localhost:5173/member');
      } else {
        // If the user exists in the database, redirect to the member page
        res.redirect('http://localhost:5173/member');
      }
    } catch (err: any) {
      res.status(500).json({ message: 'Error retrieving user information', error: err.message });
    }
  }
);


app.get('/api/products', async (req: Request, res:Response) => {
  try {
    const products = await Products.find({}); // Assuming Product is a mongoose model
    res.json(products);
  } catch (error) {
    res.status(500).send("Error retrieving products");
  }
});


app.get('/api/locusers', async (req: Request, res:Response) => {
  try {
    const lusers = await LocalUser.find({}); // Assuming Product is a mongoose model
    res.json(lusers);
  } catch (error) {
    res.status(500).send("Error retrieving products");
  }

app.get('api/orders', async (req:Request, res: Response)=>{
  try{
    const neworders=await Order.find({});
    res.json(neworders);
  }catch(error){
    res.status(500).send("Error retreiving order")
  }
})
  
});
// Checkout 
app.get('api/checkout', async (req:Request, res: Response)=>{
  try{
    const orders=await Checkout.find({});
    res.json(orders);
  }catch(error){
    res.status(500).send("Error retreiving order")
  }
})

// Google login

interface GoogleUser {
  userId: any;
  emails: string;
  photos: string;
  displayName: string;
  _id?: string; 
  googleId?: string; 
 
}


interface RequestWithGoogleUser extends Request {
  user?: GoogleUser;
}

app.get('/api/gusers/:googleId', async (req: Request, res: Response) => {
    const { googleId } = req.params;
    if (!isValidObjectId(googleId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
      const user = await GoogleUser.findOne({ googleId: googleId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err:any) {
      res.status(500).json({ message: 'Error retrieving user information', error: err.message });
    }
    
  });






// Admin login 

// declare module 'express-session' {
//   interface Session {
//     userId?: string; // Optional property to store the admin's user ID
//     isAdmin?: boolean; // Optional property to flag the session as an admin session
//   }
// }




// router.post('/api/admin/login', async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body as { username: string; password: string };
//     const adminUser = await Admin.findOne({ username }).exec();

//     if (!adminUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, adminUser.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // On successful login, save the admin user's ID in the session
//     req.session.userId = adminUser.id;
//     req.session.isAdmin = true;

//     res.json({ message: 'Login successful' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

app.use(router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.table("hello world")
  connectDatabase(); // Connect to the database
});