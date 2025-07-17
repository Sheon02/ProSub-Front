import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';
import locationSliceReducer from './slices/locationSlice'; 

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,  // RTK Query API slice
    cart: cartSliceReducer,                    // Shopping cart state
    auth: authSliceReducer, 
    location: locationSliceReducer,            // Authentication state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',  // Changed from import.meta.env
});

export default store;