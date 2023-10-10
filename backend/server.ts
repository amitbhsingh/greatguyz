import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user'

import dotenv from 'dotenv'
dotenv.config();
import connectDatabase from './config/database';

const app = express();



app.use('/users', userRoutes);
app.use(cors());

// Connect to MongoDB
connectDatabase();

// ... Rest of your server setup ...


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
app.get('/', (req, res) => {
  res.send('hello');
});
app.use(express.json());
app.use('/users', userRoutes)
