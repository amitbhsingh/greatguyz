import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cartproduct', // assuming you have a Product model
    required: true,
  },
  name: String,
  image: String,
  price: Number,
  quantity: Number,
  
});

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LocalUser', // assuming you have a User model
    required: true,
  },
  items: [OrderItemSchema], // Array of order items
  address: String, // Detailed address structure depends on your requirements
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    default: 0, // You can use enums or strings to make it more readable
  },
  method: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  // Add any other properties for an order that you need
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
