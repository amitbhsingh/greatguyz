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
    type: String
  },
  email: {
    type: String,
    required: true,
    unique:true
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
userSchema.index({ googleId: 1 });

const GoogleUser = mongoose.model('Google_Customer', userSchema);

export default GoogleUser;
