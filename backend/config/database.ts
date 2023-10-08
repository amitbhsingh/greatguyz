import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGO_URI;


const connectDatabase = () => {
  mongoose.connect('mongodb://localhost:27017/database.js', {
    useUnifiedTopology: true,
    useNewUrlParser: true  
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(error => {
    console.error('Connection error', error);
  });
}

export default connectDatabase;
