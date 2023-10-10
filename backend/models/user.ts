import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,  // remove any whitespace
        minlength: 3 // minimal length for the username
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6 // minimal length for the password
    }
}, {
    timestamps: true,  // create timestamps for each user (createdAt, updatedAt)
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;
