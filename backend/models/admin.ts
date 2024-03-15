import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the admin document
interface IAdmin extends Document {
  email: string;
  password: string;
  created: Date;
}

// Define the schema
const adminLoginSchema = new Schema<IAdmin>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Create the model
const Admin = mongoose.model<IAdmin>('AdminUser', adminLoginSchema);

export default Admin;
