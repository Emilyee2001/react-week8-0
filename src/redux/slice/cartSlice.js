import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartItem(state, action){
      state.carts = action.payload;
    },
    addCartItem(state, action){
      state.carts.push(action.payload);
    }
  }
});

export const { updateCartItem, addCartItem } = cartSlice.actions;

export default cartSlice.reducer;