import apiSlice from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        body: { ...credentials }
      }),
      invalidatesTags: ['Cart']
    }),
    register: builder.mutation({
      query: user => ({
        url: '/users/register',
        method: 'POST',
        body: {...user}
      }),
      invalidatesTags: ['Cart']
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation
} = authApiSlice;
