import { Middleware } from 'redux';
import { AppDispatch } from '../app/store';
import {
  setOrders,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
} from '../slices/ws-order'
import { IWsOrder } from '../../declarations/ws-order';

export const WS_BASE_URL = 'wss://norma.nomoreparties.space/';

interface IWsMessage {
  success: boolean;
  orders: IWsOrder[];
  total: number;
  totalToday: number;
}

export const WS_ORDERS_CONNECTION_START = 'WS_ORDERS_CONNECTION_START';
export const WS_ORDERS_CONNECTION_STOP = 'WS_ORDERS_CONNECTION_STOP';
export const WS_ORDERS_SEND_MESSAGE=  'WS_ORDERS_SEND_MESSAGE';



export const wsOrderMiddleware = (): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store as { dispatch: AppDispatch };
      const { type, payload } = action;

      if (type === WS_ORDERS_CONNECTION_START) {
        const url = payload.token
          ? `${WS_BASE_URL}orders?token=${payload.token}`
          : `${WS_BASE_URL}orders/all`;

        socket = new WebSocket(url);
        console.log('Connecting to WebSocket:', url);

        socket.onopen = () => {
          dispatch(wsConnectionSuccess());
        };

        socket.onerror = (event) => {
          dispatch(wsConnectionError('WebSocket error'));
        };

        socket.onclose = () => {
          dispatch(wsConnectionClosed());
        };

        socket.onmessage = (event) => {
          try {
            const data: IWsMessage = JSON.parse(event.data);
            if (data.success) {
              // Фильтрация дубликатов и сортировка по дате
              const normalizedOrders = data.orders
                .filter(
                  (order, index, self) =>
                    index === self.findIndex((o) => o._id === order._id),
                )
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                );

              dispatch(
                setOrders({
                  orders: normalizedOrders,
                  total: data.total,
                  totalToday: data.totalToday,
                }),
              );
            }
          } catch (err) {
            dispatch(wsConnectionError('Invalid message format'));
          }
        };
      }

      if (type === WS_ORDERS_CONNECTION_STOP && socket) {
        socket.close();
      }

      if (
        type === WS_ORDERS_SEND_MESSAGE &&
        socket?.readyState === WebSocket.OPEN
      ) {
        socket.send(JSON.stringify(payload));
      }

      return next(action);
    };
  };
};


export const wsOrdersPrivateConnectionStart = (token: string) => ({
  type: WS_ORDERS_CONNECTION_START,
  payload: { token },
});
export const wsOrdersPublicConnectionStart = () => ({
  type: WS_ORDERS_CONNECTION_START,
  payload: { token: null },
});
export const wsOrdersConnectionStop = () => ({
  type: WS_ORDERS_CONNECTION_STOP,
});
