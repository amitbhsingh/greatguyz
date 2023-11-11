import mongoose, { mongo } from "mongoose";

const LocalUserData= new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

const LocalUser = mongoose.model('register', LocalUserData);

export default LocalUser;