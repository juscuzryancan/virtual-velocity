import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Cart", "Products", "Orders"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const {
        auth: { token },
      } = getState() as RootState;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    _: builder.query({
      query: () => "/",
    }),
  }),
});

export default apiSlice;
