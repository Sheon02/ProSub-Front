// src/slices/locationSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { COUNTRY_DATA, DEFAULT_COUNTRY } from '../constants/countryData';

const initialState = {
  ...COUNTRY_DATA[DEFAULT_COUNTRY],
  countryCode: DEFAULT_COUNTRY,
  isDefault: true
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setUserLocation: (state, action) => {
      const countryCode = action.payload.countryCode || DEFAULT_COUNTRY;
      const countryInfo = COUNTRY_DATA[countryCode] || COUNTRY_DATA[DEFAULT_COUNTRY];
      
      return {
        ...state,
        ...countryInfo,
        countryCode,
        isDefault: action.payload.isDefault || false
      };
    },
    setCurrency: (state, action) => {
      const countryCode = action.payload;
      const countryInfo = COUNTRY_DATA[countryCode] || COUNTRY_DATA[DEFAULT_COUNTRY];
      
      return {
        ...state,
        ...countryInfo,
        countryCode,
        isDefault: false
      };
    }
  }
});

export const { setUserLocation, setCurrency } = locationSlice.actions;
export default locationSlice.reducer;