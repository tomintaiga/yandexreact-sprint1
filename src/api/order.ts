import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './auth';
import { TOrder } from '../../declarations/order';

type OrderRequest = {
  ingredients: Array<string>;
};

type OrderResponse = {
  success: boolean;
  name: string;
  order: TOrder;
};

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderResponse, OrderRequest>({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
