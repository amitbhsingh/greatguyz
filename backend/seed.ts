// import connectDatabase from './config/database';
import products from './models/products';
const connectDatabase = require('./config/database').default;
// Adjust the initialState to fit the schema
const initialState = [
    { id: 1, name: "Classic Burger", image: 'https://greatguyz.s3.amazonaws.com/classic.png', price: 35 },
    { id: 2, name: "Veggie King", image: 'https://greatguyz.s3.amazonaws.com/veggie.png', price: 50 },
    { id: 3, name: "Spicy Lover", image: 'https://greatguyz.s3.amazonaws.com/spicy.png', price: 45 },
    { id: 4, name: "Tandoori Burger", image: 'https://greatguyz.s3.amazonaws.com/tandoori.png', price: 45 },
];

const seedDB = async () => {
  await connectDatabase();
  await products.deleteMany(); // Clear existing products
  await products.insertMany(initialState); // Seed with initial data
  console.log('Database seeded!');
  process.exit();
};

seedDB().catch(console.error);