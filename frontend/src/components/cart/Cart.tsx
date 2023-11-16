import './Cart.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // Adjust the path to where your RootState is defined

const Cart = () => {
  // Use the useSelector hook to access the cart items from the Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <p>Subtotal: ₹{item.price * item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
