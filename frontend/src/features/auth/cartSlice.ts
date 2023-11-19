import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import {nanoid} from 'nanoid';

interface CartItem {
  id: number;
  cartItemId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  addedAt?: Date;
}

interface IncreasePayload{
  id: number;
}
interface DecreasePayload{
  id: number;
}
interface RemoveItem{
  id: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(item => item.id === action.payload.id);
    
      if (item) {
        item.quantity +=action.payload.quantity ?? 0;
        if (action.payload.price){
          item.price=action.payload.price;
        }
        item.addedAt=new Date();
      } else {
        state.items.push({
          ...action.payload,
          quantity:action.payload.quantity ?? 1,
          addedAt:new Date(),
          cartItemId:nanoid(),
        } as CartItem);
      }
    },
    IncreasePayload: (
      state,
      action: PayloadAction<number>
    ) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item){
        item.quantity++;
      }
    },

    DecreasePayload: (
      state,
      action: PayloadAction<number>
    ) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },

    
    RemoveItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItemToCart, RemoveItem, IncreasePayload, DecreasePayload } = cartSlice.actions;
export default cartSlice.reducer;



// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   cartItemId: string; // Assuming you've added this and it is not optional
//   addedAt?: string; // Assuming you've changed this from Date to string
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItemToCart: {
//       reducer: (state, action: PayloadAction<CartItem>) => {
//         const item = state.items.find(item => item.id === action.payload.id);
//         if (item) {
//           item.quantity += action.payload.quantity ?? 0;
//           // Optionally update price or any other properties here
//         } else {
//           // Item not found, push a new one
//           state.items.push({
//             ...action.payload,
//             quantity: action.payload.quantity ?? 1,
//             cartItemId: action.payload.cartItemId ?? nanoid(),
//             addedAt: action.payload.addedAt ?? new Date(),
//           });
//         }
//       },
//       prepare: (item: Omit<CartItem, 'cartItemId' | 'addedAt'>) => ({
//         payload: {
//           ...item,
//           cartItemId: nanoid(), // Generate a unique ID for the cart item
//           addedAt: new Date(),  // Set the timestamp when the item was added
//         } as CartItem,
//       }),
//     },
//     increaseQuantity: (state, action: PayloadAction<IncreasePayload>) => {
//       const item = state.items.find((item) => item.id === action.payload.id);
//       if (item) {
//         item.quantity++;
//       }
//     },
//     decreaseQuantity: (state, action: PayloadAction<DecreasePayload>) => {
//       const item = state.items.find((item) => item.id === action.payload.id);
//       if (item && item.quantity > 1) {
//         item.quantity--;
//       }
//     },
//     removeItem: (state, action: PayloadAction<RemovePayload>) => {
//       state.items = state.items.filter(item => item.cartItemId !== action.payload.id);
//     },
//   },
// });

// export const { addItemToCart, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions;
// export default cartSlice.reducer;