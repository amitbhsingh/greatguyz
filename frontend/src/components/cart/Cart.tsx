"use client"
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux';
import { RemoveItem, IncreasePayload, DecreasePayload, calculateCart } from '../../features/auth/cartSlice'
import Card from 'react-bootstrap/Card';
import { RootState } from '../../redux/store';
import CtComp from './Checkout'
// import { clearUser } from '../../features/auth/authSlice'

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = useSelector((state: RootState) => state.cart.items.reduce((count, item) => count + item.quantity, 0));
  const user = useSelector((state: RootState) => state.auth.user);
  
  // const handleLogout = () => {
  //   dispatch(clearUser());
  //   // Redirect to home page or perform other actions as needed
  // };
  
  const increaseItem = (id: number, hasCheese: boolean) => {
    dispatch(IncreasePayload({ id, hasCheese }));
    dispatch(calculateCart());
  };

  const decreaseItem = (id: number, hasCheese: boolean) => {
    dispatch(DecreasePayload({ id, hasCheese }));
    dispatch(calculateCart());
  };
  
  const removeItemFromCart = (cartItemId: string) => {
    dispatch(RemoveItem(cartItemId));
    dispatch(calculateCart());
  };
  
  const { subtotal, tax, total } = useSelector((state: RootState) => state.cart);

  return (
    <>
      <div className="cart-container">
        {/* Conditionally render the welcome message only if the user is logged in */}
        {user && (
          <h3>Welcome {user.email}! You have {cartItemCount} items in your cart.</h3>
        )}
        <h1 className='h1-cart'>Your Cart</h1>
        {cartItems.length === 0 ? (
          <h2 className='h2-cart'>is empty :(</h2>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                  <button className='cartRemoveBtn' onClick={() => increaseItem(item.id, item.hasCheese)}>+</button>
                  <button className='cartRemoveBtn' onClick={() => removeItemFromCart(item.cartItemId)}>Remove</button>
                  <button className='cartRemoveBtn' onClick={() => decreaseItem(item.id, item.hasCheese)}>-</button>      
                </div>
              </li>
            ))}
          </ul>
        )}
        <Card className='totalCart' style={{ width: '10rem' }}>
          <Card.Body>
            <button className='cartOneBtn'  ><Card.Link href="CtComp">Checkout</Card.Link>
            </button>

            
          </Card.Body>
          <Card.Footer className='cartOne' >
            <button className='cartOneBtn'><Card.Link href="handleCheckoutCart">Checkout as Guest</Card.Link></button>
          </Card.Footer>
          <div className='total'>
            <p>Subtotal: ₹{parseFloat(subtotal.toFixed(2))}</p>
            <p>Total Tax: ₹{parseFloat(tax.toFixed(2))}</p>
            <p>Total: ₹{parseFloat(total.toFixed(2))}</p>
          </div>
        </Card>
      </div>
      
    </>
  );
};

export default Cart;
