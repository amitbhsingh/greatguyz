import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Menu.css';
import classic from '../assets/classic.png';
import veggie from '../assets/veggie.png';
import spicy from '../assets/spicy.png';
import tandoori from '../assets/tandoori.png';
import { addItemToCart} from '../features/auth/cartSlice'; // Correct path to your action



const Menu = () => {
  interface MenuItem {
    id: number;
    name: string;
    image: string;
    price: number;
     
  }
  
  const menuItems: MenuItem[] = [
    { id: 1, name: "Classic Burger", image: classic, price: 25 },
    { id: 2, name: "Veggie King", image: veggie, price: 40 },
    { id: 3, name: "Spicy Lover", image: spicy, price: 35 },
    { id: 4, name: "Tandoori Burger", image: tandoori, price: 35 },
    
  ];
  const dispatch = useDispatch();
  const [cheeseSelections, setCheeseSelections] = useState<{ [key: number]: boolean }>({});

  const toggleCheese = (id: number, hasCheese: boolean) => {
    setCheeseSelections({
      ...cheeseSelections,
      [id]: hasCheese
    });
  };
  

  const add = (item: MenuItem) => {
    const finalPrice = cheeseSelections[item.id] ? item.price + 10 : item.price;
    dispatch(addItemToCart({
      ...item, price: finalPrice,
      quantity: 0
    }));
  };
  
  

  return (
    <div className="box-container">
      {menuItems.map((item) => (
        <div key={item.id} className="box">
          <img className='burger-img' src={item.image} alt={item.name} style={{ borderRadius: "1rem" }} />
          <p className='burger-des'>{item.name}</p>
          <select className='selection' onChange={(e) => toggleCheese(item.id, e.target.value === 'With Cheese')}>
            <option className="selectoption" value="With Cheese">Cheese</option>
            <option value="No Cheese">No Cheese</option>
          </select>
          <br />
          <button className='cart1' onClick={() => add(item)}>Add to Cart</button>
          
        </div>
      ))}
    </div>
  );
};

export default Menu;
