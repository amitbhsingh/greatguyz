import mongoose from "mongoose";

const LocalUserData = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, 
    required: true,
    unique: false,
    select:false, //hides the password field when we retrieve data from database
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

const LocalUser = mongoose.model('LocUser', LocalUserData);

export default LocalUser;
