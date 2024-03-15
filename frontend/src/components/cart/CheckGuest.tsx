// CheckoutAsGuest.tsx
import React, { useState, FormEvent } from 'react';
import axios from 'axios';

interface IGuestCheckoutForm {
  email: string;
  name: string;
  address: string;
}

const CheckoutAsGuest: React.FC = () => {
  const [formData, setFormData] = useState<IGuestCheckoutForm>({
    email: '',
    name: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const checkoutUrl = 'https://localhost:3000/api/checkout/guest';

    try {
      const response = await axios.post(checkoutUrl, formData);
      console.log('Checkout successful', response.data);
      // Additional logic to handle successful checkout
    } catch (error) {
      console.error('Checkout failed', error);
      // Additional logic to handle checkout failure
    }
  };

  return (
    <div>
      <h1>Checkout as Guest</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit"> Submit</button>
        
      </form>
    </div>
  );
};

export default CheckoutAsGuest;
