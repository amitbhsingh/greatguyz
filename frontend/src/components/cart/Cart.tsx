import './Cart.css'
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import { RootState } from '../../redux/store'; // Adjust the path to where your RootState is defined
import {RemoveItem,IncreasePayload,DecreasePayload } from '../../features/auth/cartSlice'
import Card from 'react-bootstrap/Card';


const Cart = () => {
  // Use the useSelector hook to access the cart items from the Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const taxRate=.28;

  const dispatch=useDispatch();
  const removeItemFromCart=(id: number)=>{
    dispatch(RemoveItem(id));
    
  }
  const increaseItem=(id:number)=>{
    dispatch(IncreasePayload(id));
  }
  const decreaseItem=(id:number)=>{
    dispatch(DecreasePayload(id));
  }

  // calculating total tax amount
  const totalTax = cartItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity) * taxRate;
  }, 0);
  
  // Calculate the total price for all items including tax
  const totalPriceWithTax = cartItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0) + totalTax;





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
                <p>Tax: ₹{parseFloat(totalTax.toFixed(2))}</p>
                
                <button className='cartOneBtn' onClick={() => increaseItem(item.id)}>+</button>
                <button className='cartOneBtn' onClick={() => removeItemFromCart(item.id)}>Remove</button>
                <button className='cartOneBtn' onClick={() => decreaseItem(item.id)}>-</button>
                <Card className='totalCart'style={{ width: '20rem'}}>
                  <Card.Body>
                    <h1><p>Total: ₹{parseFloat(totalPriceWithTax.toFixed(2))}</p></h1>
                    <button className='cartOneBtn'><Card.Link href="/login">Order Now</Card.Link></button>
                     <button className='cartOne'><Card.Link href="#">Checkout as Guest</Card.Link></button>
                  </Card.Body>
                  </Card>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
