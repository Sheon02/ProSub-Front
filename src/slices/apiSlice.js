import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api', // Your API base URL (adjust if needed)
  prepareHeaders: (headers, { getState }) => {
    // Get the token from Redux state or localStorage
    const token = getState().auth?.userInfo?.token || JSON.parse(localStorage.getItem('userInfo'))?.token;

    // If token exists, add it to headers
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'], // Tags for cache invalidation
  endpoints: (builder) => ({}), // Empty for now (injected in other slices)
});