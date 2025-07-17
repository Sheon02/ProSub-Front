import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';
import { logout } from '../slices/authSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {
        // Store token in localStorage
        if (response?.token) {
          localStorage.setItem('authToken', response.token);
        }
        return response;
      },
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: USERS_URL,
        method: 'POST',
        body: userData,
      }),
    }),

      logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          localStorage.removeItem('authToken');
          localStorage.removeItem('userInfo');
        } catch (error) {
          // Force client-side cleanup even if server fails
          dispatch(logout());
          localStorage.removeItem('authToken');
          localStorage.removeItem('userInfo');
          console.error('Logout error:', error);
        }
      },
    }),

    updateUserProfile: builder.mutation({
  query: (profileData) => ({
    url: `${USERS_URL}/profile`,
    method: 'PUT',
    body: profileData,
  }),
}),

    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'User', id })), 'User']
          : ['User'],
      keepUnusedDataFor: 60, // 60 seconds cache
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      providesTags: (result, error, id) => [{ type: 'User', id }],
      keepUnusedDataFor: 60,
    }),

    updateUser: builder.mutation({
      query: ({ userId, ...rest }) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'User', userId }],
    }),
    updatePassword: builder.mutation({
  query: (data) => ({
    url: '/api/users/update-password',
    method: 'PUT',
    body: data,
  }),
}),
sendOTP: builder.mutation({
  query: (data) => ({
    url: '/api/users/send-otp',
    method: 'POST',
    body: data,
  }),
}),
verifyOTP: builder.mutation({
  query: (data) => ({
    url: '/api/users/verify-otp',
    method: 'POST',
    body: data,
  }),
}),
  }),
});


export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useSendOTPMutation,
  useVerifyOTPMutation
} = usersApiSlice;