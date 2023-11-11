import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true,
    unique: false
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('Google_Customer', userSchema);

export default User;
