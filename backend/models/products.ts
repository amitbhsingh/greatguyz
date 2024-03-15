import mongoose from "mongoose";

const product = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
    maxLength: 200,
  },
  image: {
    type: String,
    required: true,
    maxLength: 200,
  },
  price: {
    type: Number,
    required: true
  },
  
  created: {
    type: Date,
    default: Date.now,
  },
  
});

const cartproduct = mongoose.model('products', product);

export default cartproduct;
