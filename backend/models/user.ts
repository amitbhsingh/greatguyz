import mongoose, { Document, Model } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  email?: string;
  googleId?: string;
  displayName?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  // ... your schema definition as is
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
