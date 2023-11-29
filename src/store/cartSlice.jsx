import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action) {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    remove(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1); 
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    loadCart(state, action) {
      state.items = action.payload;
    },
  },
});

export const selectCartItemsCount = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const { add, remove ,loadCart } = cartSlice.actions;
export default cartSlice.reducer;
