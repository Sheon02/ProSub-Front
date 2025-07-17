import { apiSlice } from './apiSlice';
import { PRODUCTS_URL } from '../constants';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
  query: ({ keyword }) => ({  
    url: PRODUCTS_URL,
    params: { keyword },  
  }),
    keepUnusedDataFor: 5,
    providesTags: ['Products'],
      }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: PRODUCTS_URL,
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
   deleteProduct: builder.mutation({
      query: (productId) => ({
      url: `${PRODUCTS_URL}/${productId}`,
      method: 'DELETE',
     }),
      invalidatesTags: ['Product'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
     toggleProductOn: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/toggleon/${productId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Product'],
    }),
    toggleProductOff: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/toggleoff/${productId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useToggleProductOnMutation,
  useToggleProductOffMutation,
  useCreateReviewMutation,
} = productsApiSlice;