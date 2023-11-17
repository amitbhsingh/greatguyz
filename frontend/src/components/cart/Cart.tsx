import './Cart.css'
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import { RootState } from '../../redux/store'; // Adjust the path to where your RootState is defined
import {RemoveItem} from '../../features/auth/cartSlice'
const Cart = () => {
  // Use the useSelector hook to access the cart items from the Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const dispatch=useDispatch();
  const removeItemFromCart=(id:number)=>{
    dispatch(RemoveItem(id))
  }


  

  return (
    <div className="cart-container">
      <h1 className='h1-cart' >Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <h1 className='h2-cart' >is empty :(</h1>
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
                <button className='cart1' onClick={() => removeItemFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
