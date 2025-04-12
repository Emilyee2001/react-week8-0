import { configureStore } from "@reduxjs/toolkit";
import toastSliceReducer from "./slice/toastSlice";
import cartSliceReducer from "./slice/CartSlice";

const store = configureStore({
  reducer: {
    toast: toastSliceReducer,
    cart: cartSliceReducer,
  }
});

export default store;