import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
    maxLength: 60,
  },
  address: {
    type: String,
    required: true,
    maxLength: 200,
  },
  total: {
    type: Number,
    required: true,
    maxLength: 200,
  },
  status: {
    type: Number,
    default: 0,
  }, 
  method: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  
});

const orders = mongoose.model('products', OrderSchema);

export default orders;
