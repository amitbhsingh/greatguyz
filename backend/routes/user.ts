import express from 'express';
const router = express.Router();

// User Registration Route
router.post('/register', (req, res) => {
    // Handle user registration logic here...
    res.send('User registration endpoint');
});

// User Login Route
router.post('/login', (req, res) => {
    // Handle user login logic here...
    res.send('User login endpoint');
});

// Export the router to use in your main server file
export default router;
