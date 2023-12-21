import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import {nanoid} from 'nanoid';

interface CartItem {
  id: number;
  cartItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  hasCheese: boolean;
  // addedAt?: Date;
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
  subtotal:number;
  tax:number;
  total:number;
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
};
const taxRate=.28;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    calculateCart: (state) => {
      state.subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.tax = state.subtotal * taxRate;
      state.total = state.subtotal + state.tax;
    },
    
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, hasCheese, cartItemId } = action.payload;
      // Look for an item with the same ID and cheese selection
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === id && item.hasCheese === hasCheese
      );
      if (existingItemIndex !== -1) {
        // If such an item exists, increase the quantity
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // Otherwise, add the new item with the adjusted price
        state.items.push({ ...action.payload, cartItemId: cartItemId || nanoid() });
      }
      // Recalculate the cart totals after adding the item
      cartSlice.caseReducers.calculateCart(state);
      
    },
    IncreasePayload: (state, action: PayloadAction<{ id: number, hasCheese: boolean }>) => {
      const { id, hasCheese } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id && item.hasCheese === hasCheese);
    
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity += 1;
        
      }
      
    },

    DecreasePayload: (state, action: PayloadAction<{ id: number, hasCheese: boolean }>) => {
      const { id, hasCheese } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id && item.hasCheese === hasCheese);
    
      if (itemIndex !== -1 && state.items[itemIndex].quantity > 1) {
        // Ensure we don't decrease quantity below 1
        state.items[itemIndex].quantity -= 1;
      }
      
    },
    

    
    RemoveItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.cartItemId !== action.payload);
    },
  },
});

export const { addItemToCart, calculateCart, IncreasePayload, DecreasePayload, RemoveItem} = cartSlice.actions;
export default cartSlice.reducer;


