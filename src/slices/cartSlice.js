import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate total price
      state.totalPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );

      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      // Calculate total price
      state.totalPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );

      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      state.totalPrice = 0;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, savePaymentMethod, clearCartItems, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;