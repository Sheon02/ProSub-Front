import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage operations
const getStoredUserInfo = () => {
  try {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error('Failed to parse userInfo from localStorage', error);
    localStorage.removeItem('userInfo'); // Clear corrupted data
    return null;
  }
};

const initialState = {
  userInfo: getStoredUserInfo(),
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.status = 'succeeded';
      state.error = null;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('userInfo');
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

// Thunk for login operation (example)
export const login = (credentials) => async (dispatch) => {
  dispatch(setLoading());
  try {
    // Replace with your actual API call
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    dispatch(setCredentials(data));
  } catch (error) {
    dispatch(setError(error.message));
    throw error; // Re-throw for component-level handling
  }
};

// Thunk for token verification (on app load)
export const verifyToken = () => async (dispatch) => {
  const userInfo = getStoredUserInfo();
  if (!userInfo?.token) return;
  
  dispatch(setLoading());
  try {
    // Replace with your actual token verification API
    const response = await fetch('/api/auth/verify', {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Session expired');
    }
    
    // Optionally refresh token if needed
    const data = await response.json();
    dispatch(setCredentials(data));
  } catch (error) {
    dispatch(logout());
    dispatch(setError(error.message));
  }
};

export const { 
  setCredentials, 
  logout, 
  setLoading, 
  setError, 
  clearError 
} = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.userInfo;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => !!state.auth.userInfo;

export default authSlice.reducer;