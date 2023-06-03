import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productsSlice from "./productsSlice";
import cartSlice from "./cartSlice";
import ordersSlice from "./ordersSlice";
import verificationSlice from "./verificationSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    orders: ordersSlice,
    cart: cartSlice,
    verification: verificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
