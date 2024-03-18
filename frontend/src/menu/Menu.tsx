import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchMenuItems } from '../features/auth/menuSlice';
import { addItemToCart,calculateCart } from '../features/auth/cartSlice';
import { nanoid } from 'nanoid';
import type { RootState } from '../redux/store';
import './Menu.css';
import {useAppDispatch} from '../hooks'
type CheeseSelections={
  [key: number]:boolean;
}
const Menu = () => {
  const menuItems = useSelector((state: RootState) => state.menu.items); // Adjusted for RootState
  const dispatch = useAppDispatch();

  

  useEffect(() => {
    dispatch(fetchMenuItems()); // Fetch items when the component mounts
  }, [dispatch]);
  // Initialize state for cheese selections
  const [cheeseSelections, setCheeseSelections] = useState<CheeseSelections>({});

  // Set initial cheese selections when menuItems are available
  useEffect(() => {
    const newCheeseSelections = menuItems.reduce((selections, item) => {
      selections[item.id] = true; // Default to true (with cheese)
      return selections;
    }, {}as CheeseSelections);
    setCheeseSelections(newCheeseSelections);
  }, [menuItems]);

  const toggleCheese = (id: number, hasCheese: boolean) => {
    setCheeseSelections((prevSelections) => ({
      ...prevSelections,
      [id]: hasCheese,
    }));
  };

  const add = (burger:any) => {
    const withCheese = cheeseSelections[burger.id];
    const finalPrice = withCheese ? burger.price : burger.price - 10;
    dispatch(addItemToCart({
      ...burger,
      price: finalPrice,
      hasCheese: withCheese,
      quantity: 1,
      cartItemId: nanoid(),
    }));
    dispatch(calculateCart())
    
  };
  
  return (
    <div className="box-container">
      {menuItems.map((item) => (
        <div key={item.id} className="box">
          <img className='burger-img' src={item.image} alt={item.name} />
          <p className='burger-des'>{item.name}</p>
          <select 
            className='selection' 
            value={cheeseSelections[item.id] ? 'With Cheese' : 'No Cheese'}
            onChange={(e) => toggleCheese(item.id, e.target.value === 'With Cheese')}
          >
            <option value="With Cheese">Cheese</option>
            <option value="No Cheese">No Cheese</option>
          </select>
          <br />
          <button className='cart1' onClick={() => add(item)}  >Add to Cart  </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;