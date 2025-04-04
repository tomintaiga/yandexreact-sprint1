import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie, setCookie, deleteCookie } from '../utils/cookie';
import { BASE_URL } from '../utils/request';
import { TUser } from '../../declarations/user';

// Типы для запросов и ответов
type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

type AuthResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user?: TUser;
};

type ResetResponse = {
  success: boolean;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { endpoint }) => {
    // Для login и register не добавляем токен
    if (endpoint === 'login' || endpoint === 'register') {
      return headers;
    }

    const token = getCookie('token');
    if (token) {
      headers.set('Authorization', token);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  // TODO: испраивть типы
  console.log('baseQueryWithReauth', result);
  if(result.error) {
    console.error('Error in baseQueryWithReauth:', result.error);
  }

  if (result.error?.data?.message === 'jwt expired') {
    const refreshResult = await baseQuery(
      {
        url: 'auth/token',
        method: 'POST',
        body: { token: getCookie('refreshToken') },
      },
      api,
      extraOptions,
    );

    const data = refreshResult.data as AuthResponse;

    if (data && data.success) {
      setCookie('token', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      return await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    forgotPassword: builder.mutation<ResetResponse, string>({
      query: (email) => ({
        url: 'password-reset',
        method: 'POST',
        body: { email },
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: {
          token: getCookie('refreshToken'),
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Очищаем cookies при успешном выходе
          deleteCookie('token');
          deleteCookie('refreshToken');
        } catch (err) {
          console.error('Logout failed:', err);
        }
      },
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
} = authApi;
