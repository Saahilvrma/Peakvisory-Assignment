import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/api/axiosBaseQuery";
import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
  User,
} from "@/types/auth.types";

/* ------------------------------------------------------------------ */
/*  Auth API slice                                                     */
/* ------------------------------------------------------------------ */

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    /** POST /api/auth/signup */
    signup: builder.mutation<AuthResponse, SignupPayload>({
      query: (body) => ({
        url: "/api/auth/signup",
        method: "POST",
        data: body,
      }),
    }),

    /** POST /api/auth/login */
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        data: body,
      }),
    }),

    /** GET /api/auth/me — fetch current user via token */
    getMe: builder.query<User, void>({
      query: () => ({
        url: "/api/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} = authApi;
