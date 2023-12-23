import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMenuItem, updateMenu } from '../features/auth/menuSlice';

const AdminLogin = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(''); // Assuming you will use data URL for images
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Logic to handle admin login
    // If successful:
    setAuthenticated(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Define logic to generate the next ID here
    const nextId = 5; // Placeholder for next ID logic
    
    const menuItem = {
      id: nextId,
      name,
      price: parseFloat(price),
      image // This should be the data URL or a path to the image
    };
  
    // Dispatch the `addMenuItem` action if it's a new item
    // or `updateMenu` if you're updating an existing item
    dispatch(addMenuItem(menuItem));
    // dispatch(updateMenu(menuItem));

  };

  if (!authenticated) {
    return (
      <div>
        {/* Login form would go here */}
        <button onClick={handleLogin}>Login as Admin</button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <input
          type="file"
          onChange={handleImageChange}
        />
        <button type="submit">Add/Update Menu Item</button>
      </form>
    </div>
  );
};

export default AdminLogin;
