import mongoose from "mongoose";

// Item Schema
const itemSchema = new mongoose.Schema({
  _id: String, 
  id: Number, 
  name: String,
  image: String, // URL to the product image
  price: Number, // Price of the product
  hasCheese: Boolean, // Specific option for the product
  quantity: Number, // Quantity of the product in the cart
  created: Date,
});

// Cart Schema
const cartSchema = new mongoose.Schema({
  items: [itemSchema], // Array of items in the cart
  subtotal: Number, // Subtotal price
  tax: Number, // Tax amount
  total: Number, // Total price after tax
  // You can add additional properties like userId, date, etc.
});

// Cart Model
const CCart = mongoose.model('CheckoutCart', cartSchema);

export default CCart;
