import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items:
    localStorage.getItem("cart") !== null
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  amount:
    localStorage.getItem("cartAmount") !== null
      ? JSON.parse(localStorage.getItem("cartAmount"))
      : 0,
  price:
    localStorage.getItem("cartPrice") !== null
      ? JSON.parse(localStorage.getItem("cartPrice"))
      : 0,
};

const storeCart = (state) => {
  localStorage.setItem("cart", JSON.stringify(state.items));
  localStorage.setItem("cartAmount", state.amount);
  localStorage.setItem("cartPrice", state.price);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.amount++;
      } else {
        const newItem = {
          id: action.payload.id,
          item: { ...action.payload },
          amount: 1,
        };

        state.items.push(newItem);
      }

      state.amount++;
      state.price += action.payload.individualPrice;

      storeCart(state);
    },
    removeFromCart(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (!item) {
        return;
      }

      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.amount -= item.amount;
      state.price -= item.amount * action.payload.price;

      storeCart(state);
    },
    increase(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.amount++;
      } else {
        const newItem = {
          id: action.payload.id,
          item: { ...action.payload },
          amount: 1,
        };

        state.items.push(newItem);
      }

      state.amount++;
      state.price += action.payload.individualPrice;

      storeCart(state);
    },
    decrease(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (!item) {
        return;
      }

      item.amount--;
      state.amount--;
      state.price -= action.payload.individualPrice;
      if (item.amount === 0) {
        // Everything but item
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }

      storeCart(state);
    },
    clearCart(state, action) {
      state.items = [];
      state.amount = 0;
      state.price = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("cartAmount");
      localStorage.removeItem("cartPrice");
    },
  },
});

export const { addToCart, removeFromCart, increase, decrease, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
