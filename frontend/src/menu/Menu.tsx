
// import { Box, useMediaQuery} from '@mui/material'
// import MenuBox from './MenuBox'
import './Menu.css'
import classic from '../assets/classic.png'
import veggie from '../assets/veggie.png'
import spicy from '../assets/spicy.png'
import tandoori from '../assets/tandoori.png'
import { useState } from 'react'




const Menu = () => {
  const [burgers,setBurgers]=useState(0)
  
  const decrease=()=>{
    if (burgers==0) return;
    setBurgers(burgers-1);
  };
  const increase=()=>{
    setBurgers(burgers+1);
  }
  // const [cart,setCart]=useState([])
  // function addToCart(item){
  //   setCart([...cart,item]);
  // }
  
  
  return (
    <div className="box-container">
    <div className="box">
      <h1>Hello  </h1>
    <button className='incdec' onClick={increase}> + </button>
    <img className='burger-img' src={classic} alt="Image 1" style={{borderRadius:"1rem"}}/>  
    <button className='incdec' onClick={decrease} >-</button>
    
      
      <p className='burger-des' >Classic Burger {burgers} </p>
      <select className='selection'>
        <option className="selectoption" value="With Cheese">Cheese</option>
        <option value="With Cheese">No Cheese</option>
      </select>
      <br />
      <button className='cart1'  > Add to cart</button>
      <br />
  
    </div>
    <div className="box">
      <img className='burger-img' src={veggie} alt="Image 2" style={{borderRadius:"1rem"}} />
      <p className='burger-des' >Veggie King</p>
      <select className='selection'>
        <option className="selectoption" value="With Cheese">Cheese</option>
        <option value="With Cheese">No Cheese</option>
      </select>
      <br />
      <button className='cart1' >Add to cart</button>
    </div>
    <div className="box">
      <img className='burger-img' src={spicy} alt="Image 3" style={{borderRadius:"1rem"}} />
      <p className='burger-des'>Spicy Lover</p>
      <select className='selection'>
        <option className="selectoption" value="With Cheese">Cheese</option>
        <option value="With Cheese">No Cheese</option>
      </select>
      <br />
      <button className='cart1' >Add to Cart</button >
    </div>
    <div className="box">
      <img className='burger-img' src={tandoori} alt="Image 4" style={{borderRadius:"1rem"}} />
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



// const gridTemplateLarge=`
//   "a b c"
//   "a b c"
//   "a b c"
//   "d e f"
//   "d e f"
//   "d e f"
//   "g h i"
//   "g h i"
//   "g h i"
//   "j k l"
//   "j k l"
//   "j k l"
// `
// const gridTemplateSmall=`
//   "a "
//   "a "
//   "a "
//   "b"
//   "b"
//   "b"
//   "c"
//   "c"
//   "c"
//   "c"
//   "d"
//   "d"
//   "d"
//   "e"
//   "e"
//   "e"
//   "f"
//   "f"
//   "f"
//   "g"
//   "g"
//   "g"
//   "h"
//   "h"
//   "h"
//   "i"
//   "i"
//   "i"
//   "j"
//   "j"
//   "j"
//   "k"
//   "k"
//   "k"
//   "l"
//   "l"
//   "l"
// `



// const Menu = () => {
//   const isAboveMediumScreens=useMediaQuery("(min-width:1200px)")
//   return (
//       <Box
//         margin={3}
//         width="100%" 
//         height="100%" 
//         display="grid" 
//         gap="1.5rem"
//       sx={
//         isAboveMediumScreens ? {
        
//         backgroundColor:'bs-dark',
//         gridTemplateColumns: "repeat(3,minmax(375px,1fr))",
//         gridTemplateRows: "repeat(12,minmax(90px,1fr))",
//         gridTemplateAreas: gridTemplateLarge,
//       }:{
//         gridAutoColumns: "1fr",
//         gridAutoRows: "120px",
//         gridTemplateAreas:gridTemplateSmall,
//       }
//     }
//       >
        
        
//         <Box bgcolor="#212529" gridArea="a" ></Box>
//         <Box bgcolor="#212529" gridArea="b" ></Box>
//         <Box bgcolor="#212529" gridArea="c" ></Box>
//         <Box bgcolor="#212529" gridArea="d" ></Box>
//         <Box bgcolor="#212529" gridArea="e" ></Box>
//         <Box bgcolor="#212529" gridArea="f" ></Box>
//         <Box bgcolor="#212529" gridArea="g" ></Box>
//         <Box bgcolor="#212529" gridArea="h" ></Box>
//         <Box bgcolor="#212529" gridArea="i" ></Box>
//         <Box bgcolor="#212529" gridArea="j" ></Box>
//         <Box bgcolor="#212529" gridArea="k" ></Box>
//         <Box bgcolor="#212529" gridArea="l" ></Box>
//       </Box>

      
//   )
// }
// export default Menu;