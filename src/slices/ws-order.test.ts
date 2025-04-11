import wsOrdersReducer, {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  setOrders,
  IWsOrdersState,
} from './ws-order';
import { describe, expect, it } from '@jest/globals';

describe('wsOrdersSlice reducers', () => {
  const initialState: IWsOrdersState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
  };

  it('should handle initial state', () => {
    const action = { type: undefined };
    const state = wsOrdersReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should handle wsConnectionSuccess', () => {
    const nextState = wsOrdersReducer(initialState, wsConnectionSuccess());
    expect(nextState).toEqual({
      ...initialState,
      wsConnected: true,
      error: undefined,
    });
  });

  it('should handle wsConnectionError', () => {
    const errorMessage = 'Connection failed';
    const nextState = wsOrdersReducer(
      initialState,
      wsConnectionError(errorMessage),
    );
    expect(nextState).toEqual({
      ...initialState,
      wsConnected: false,
      error: errorMessage,
    });
  });

  it('should handle wsConnectionClosed', () => {
    const modifiedState = { ...initialState, wsConnected: true };
    const nextState = wsOrdersReducer(modifiedState, wsConnectionClosed());
    expect(nextState).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it('should handle setOrders', () => {
    const ordersPayload = {
      orders: [
        {
          _id: '1',
          ingredients: ['ingredient1', 'ingredient2'],
          status: 'done',
          number: 123,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          name: 'Order 1',
        },
      ],
      total: 100,
      totalToday: 10,
    };
    const nextState = wsOrdersReducer(initialState, setOrders(ordersPayload));
    expect(nextState).toEqual({
      ...initialState,
      orders: ordersPayload.orders,
      total: ordersPayload.total,
      totalToday: ordersPayload.totalToday,
    });
  });
});
