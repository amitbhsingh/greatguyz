import mongoose, { mongo } from "mongoose";

const LocalUserData= new mongoose.Schema({
  name: String,
  email: String,
  password: String
  
})




const LocalUser = mongoose.model('LocalRegisters', LocalUserData);

export default LocalUser;