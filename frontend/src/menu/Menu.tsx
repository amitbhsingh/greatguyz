
import './Menu.css'
import menuItems from '../menu/MenuItems';

const Menu = () => {
  const firstItem=menuItems[0]
  const secondItem=menuItems[1]
  const thirdItem=menuItems[2]
  const fourthItem=menuItems[3]
  return (
    <div className="box-container">
    <div className="box" >
    <img className='burger-img' src={firstItem.image} alt="Image 1" style={{borderRadius:"1rem"}}/>      
      <p className='burger-des' >Classic Burger {firstItem.name} </p>
      <select className='selection'>
        <option className="selectoption" value="With Cheese">Cheese</option>
        <option value="With Cheese">No Cheese</option>
      </select>
      <br />
      <button className='cart1'> Add to cart</button>
      <br />
    </div>
    <div className="box">
      <img className='burger-img' src={secondItem.image} alt="Image 2" style={{borderRadius:"1rem"}} />
      <p className='burger-des' >Veggie King</p>
      <select className='selection'>
        <option className="selectoption" value="With Cheese">Cheese</option>
        <option value="With Cheese">No Cheese</option>
      </select>
      <br />
      <button className='cart1' >Add to cart</button>
    </div>
    <div className="box">
      <img className='burger-img' src={thirdItem.image} alt="Image 3" style={{borderRadius:"1rem"}} />
      <p className='burger-des'>Spicy Lover</p>
      <select className='selection'>
        <option className="selectoption" value="With Cheese">Cheese</option>
        <option value="With Cheese">No Cheese</option>
      </select>
      <br />
      <button className='cart1' >Add to Cart</button >
    </div>
    <div className="box">
      <img className='burger-img' src={fourthItem.image} alt="Image 4" style={{borderRadius:"1rem"}} />
      <p className='burger-des' > Tandoori</p>
      <select className='selection'>
        <option className="selectoption" value="With Cheese">Cheese</option>
        <option value="With Cheese">No Cheese</option>
      </select>
      <br />
      <button className='cart1'>Add to Cart</button>
    </div>
    <div className="box">
      {/* <img src="" alt="Image 1"> */}
      <p>Description 5</p>
      
      <button className='cart1'>Add to Cart</button>
    </div>
    <div className="box">
      {/* <img src="" alt="Image 1"> */}
      <p>Description 6</p>
      <button className='cart1'>Add to Cart</button>
    </div>
    <div className="box">
      {/* <img src="" alt="Image 1"> */}
      <p>Description 7</p>
      <button className='cart1'>Add to Cart</button>
    </div>
    <div className="box">
      {/* <img src="" alt="Image 1"> */}
      <p>Description 8</p>
      <button className='cart1'>Add to Cart</button>
    </div>
    <div className="box">
      {/* <img src="" alt="Image 1"> */}
      <p>Description 9</p>
      <button className='cart1'>Add to Cart</button>
    </div>
    

    </div>
    
    
      
    
  );
}

export default Menu



// import './Menu.css';
// import classic from '../assets/classic.png';
// import veggie from '../assets/veggie.png';
// import spicy from '../assets/spicy.png';
// import tandoori from '../assets/tandoori.png';
// import { useDispatch } from 'react-redux';
// import { addItemToCart } from '../features/auth/authSlice'; // Import the action creator

// const Menu = () => {
//   const dispatch = useDispatch();

//   const addToCart = (item) => {
//     dispatch(addItemToCart(item));
//   };

//   const menuItems = [
//     { id: 1, name: "Classic Burger", price: 10, image: classic },
//     { id: 2, name: "Veggie King", price: 5, image: veggie },
//     { id: 3, name: "Spicy Lover", price: 7, image: spicy },
//     { id: 4, name: "Tandoori", price: 8, image: tandoori },
//     // ... other items
//   ];

//   return (
//     <div className="box-container">
//       {menuItems.map(item => (
//         <div className="box" key={item.id}>
//           <img className='burger-img' src={item.image} alt={item.name} style={{ borderRadius: "1rem" }} />
//           <p className='burger-des'>{item.name}</p>
//           <select className='selection'>
//             <option className="selectoption" value="With Cheese">Cheese</option>
//             <option value="With Cheese">No Cheese</option>
//           </select>
//           <br />
//           <button className='cart1' onClick={() => addToCart(item)}>Add to cart</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Menu;
