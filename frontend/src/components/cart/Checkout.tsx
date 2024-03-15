import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../redux/store';

const CheckoutComponent = () => {
  // Use useSelector to get the cart state from your Redux store
  
  const cartItems = useSelector((state: RootState) => state.cart.items);
  

  // Function to handle the checkout process
  const handleCheckoutCart = async () => {
    console.log('Cart items before sending:', cartItems);
    // URL of your backend endpoint
    const checkoutUrl = 'http://localhost:3000/api/checkout';

    try {
      // Sending the cart data to the backend
      const response = await axios.post(checkoutUrl,{ cartItems });
      // Handle success
      console.log('Checkout successful', response.data);
    } catch (error) {
      // Handle error
      console.error('Checkout failed', error);
    }
  };

  return (
    <div>
      
     <h1>hello {}</h1>
      <button onClick={handleCheckoutCart}>Checkout</button>
    </div>
  );
};

export default CheckoutComponent;
