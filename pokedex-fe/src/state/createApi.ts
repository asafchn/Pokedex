import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  credentials: "include",
});
export const createApiSlice = (reducerPath: string) => {
  return createApi({
    reducerPath,
    baseQuery: baseQuery,
    endpoints: () => ({}),
  });
};
