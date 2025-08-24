import { User } from "@/types";
import apiSlice from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Cart"],
    }),
    register: builder.mutation({
      query: (user) => ({
        url: "/users/register",
        method: "POST",
        body: { ...user },
      }),
      invalidatesTags: ["Cart"],
    }),
    getMe: builder.query<User, void>({
      query: () => "/users/me",
      providesTags: ["Me"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetMeQuery } =
  authApiSlice;
