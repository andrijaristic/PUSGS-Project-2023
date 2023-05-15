import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productsSlice from "./productsSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
