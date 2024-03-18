import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store'

interface MenuItem {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface MenuState {
  items: MenuItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async () => {
    const itemsFromMenu = await fetch('http://localhost:3000/api/products');
    return itemsFromMenu.json();
  }
);

let nextMenuId = 1;
const initialState: MenuState = {
  items: [],
  status: 'idle'
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addMenuItem: {
      reducer: (state, action: PayloadAction<MenuItem>) => {
        state.items.push(action.payload);
      },
      prepare: (item: Omit<MenuItem, 'id'>) => {
        const newItem: MenuItem = {
          id: nextMenuId++,
          ...item,
        };
        return { payload: newItem };
      },
    },
    updateMenu: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Assuming payload is an array of menu items
      })
      .addCase(fetchMenuItems.rejected, (state) => {
        state.status = 'failed';
      });
  },
});



export const { addMenuItem, updateMenu } = menuSlice.actions;

export const selectMenuItems = (state: RootState) => state.menu.items;

export default menuSlice.reducer;

// { id: 1, name: "Classic Burger", image: classic, price: 35 },
//     { id: 2, name: "Veggie King", image: veggie, price: 50 },
//     { id: 3, name: "Spicy Lover", image: spicy, price: 45 },
//     { id: 4, name: "Tandoori Burger", image: tandoori, price: 45 },


// import classic from '../../assets/classic.png';
// import veggie from '../../assets/veggie.png';
// import spicy from '../../assets/spicy.png';
// import tandoori from '../../assets/tandoori.png';
// import { createSelector } from '@reduxjs/toolkit';