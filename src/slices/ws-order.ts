import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWsOrder } from '../../declarations/ws-order';

export interface IWsOrdersState {
  wsConnected: boolean;
  orders: IWsOrder[];
  total: number;
  totalToday: number;
  error?: string;
}

const initialState: IWsOrdersState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsOrdersSlice = createSlice({
  name: 'wsOrders',
  initialState,
  reducers: {
    wsConnectionSuccess: (state) => {
      state.wsConnected = true;
      state.error = undefined;
    },
    wsConnectionError: (state, action: PayloadAction<string>) => {
      state.wsConnected = false;
      state.error = action.payload;
    },
    wsConnectionClosed: (state) => {
      state.wsConnected = false;
    },
    setOrders: (
      state,
      action: PayloadAction<{
        orders: IWsOrder[];
        total: number;
        totalToday: number;
      }>,
    ) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  setOrders,
} = wsOrdersSlice.actions;
export default wsOrdersSlice.reducer;
