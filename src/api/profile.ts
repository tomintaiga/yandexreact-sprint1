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
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<TProfileResponse, void>({
      query: () => '/auth/user',
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<TProfileResponse, Partial<TUser>>({
      query: (userData) => ({
        url: '/auth/user',
        method: 'PATCH',
        body: userData,
      }),
      onQueryStarted: async (userData, { dispatch, queryFulfilled }) => {
        try{
          await queryFulfilled;
        } catch (err) {
          dispatch(profileApi.util.invalidateTags(['Profile']));
        }
      },
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
