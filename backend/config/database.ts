import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDatabase = () => {
  mongoose.connect( process.env.MONGO_URI as string, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => {
    console.error('Connection error', error);
  });
}

export default connectDatabase;
