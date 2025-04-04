import { createApi } from '@reduxjs/toolkit/query/react';
import { TUser } from '../../declarations/user';
import { baseQueryWithReauth } from './auth';

type TProfileResponse = {
  success: boolean;
  user: TUser;
};

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProfile: builder.query<TProfileResponse, void>({
      query: () => '/auth/user',
    }),
    updateProfile: builder.mutation<TProfileResponse, Partial<TUser>>({
      query: (userData) => ({
        url: '/auth/user',
        method: 'PATCH',
        body: userData,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
