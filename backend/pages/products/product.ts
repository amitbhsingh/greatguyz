
import mongoose from "mongoose";

const product = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 60,
  },
  desc: {
    type: String,
    required: true,
    maxLength: 200,
  },
  img: {
    type: String,
    required: true,
    maxLength: 200,
  },
  prices: {
    type: [Number],
    required: true
  },
  
  created: {
    type: Date,
    default: Date.now,
  },
  
});

const products = mongoose.model('products', product);

export default products;
