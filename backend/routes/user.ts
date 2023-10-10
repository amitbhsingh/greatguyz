import express from 'express';
import User from '../models/user'; // adjust the path as needed
import bcrypt from 'bcryptjs';

const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const user = new User({
        username,
        password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    // Send a response
    res.status(201).send('User registered successfully');
});

// User Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send('Invalid username or password');
    }

    // Check if the password matches
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid username or password');
    }

    // TODO: Generate a token or set up a session for the logged-in user

    // Send a success response
    res.send('Logged in successfully');
});

// Export the router to use in your main server file
export default router;
