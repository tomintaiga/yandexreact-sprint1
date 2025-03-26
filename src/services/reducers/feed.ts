import { THistoryOrder } from '../../declarations/order-history';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TFeedActions,
} from '../actions/feed';

export type TFeedState = {
  wsConnected: boolean;
  orders: Array<THistoryOrder>;
  error?: string;
};

export const initialState: TFeedState = {
  wsConnected: false,
  orders: [],
};

export const feedReducer = (
  state: TFeedState = initialState,
  action: TFeedActions,
) => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        // Добавляем только новые заказы
        orders: [
          ...state.orders,
          action.payload.orders.map((item: THistoryOrder) => {
            if (
              !state.orders.find(
                (order: THistoryOrder) => order._id === item._id,
              )
            ) {
              return item;
            }
          }),
        ],
      };
    }
    default: {
      return state;
    }
  }
};
