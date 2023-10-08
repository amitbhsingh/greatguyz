import express from 'express';
import connectDatabase from './config/database';

const app = express();

// Connect to MongoDB
connectDatabase();

// ... Rest of your server setup ...

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
