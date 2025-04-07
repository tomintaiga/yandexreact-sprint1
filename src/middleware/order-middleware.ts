import {
  setOrders,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
} from '../slices/ws-order'
import { IWsOrder } from '../../declarations/ws-order';
import { createSocketMiddleware } from '../utils/ws-factory';

export const WS_BASE_URL = 'wss://norma.nomoreparties.space/';

export const WS_ORDERS_CONNECTION_START = 'WS_ORDERS_CONNECTION_START';
export const WS_ORDERS_CONNECTION_STOP = 'WS_ORDERS_CONNECTION_STOP';
export const WS_ORDERS_SEND_MESSAGE=  'WS_ORDERS_SEND_MESSAGE';

export const wsOrderMiddleware = createSocketMiddleware({
  wsInit: WS_ORDERS_CONNECTION_START,
  wsClose: WS_ORDERS_CONNECTION_STOP,
  wsSendMessage: WS_ORDERS_SEND_MESSAGE,
  onOpen: (dispatch) => dispatch(wsConnectionSuccess()),
  onClose: (dispatch) => dispatch(wsConnectionClosed()),
  onError: (dispatch, error) => dispatch(wsConnectionError(error)),
  onMessage: (dispatch, data: { success: boolean; orders: IWsOrder[]; total: number; totalToday: number }) => {
      if (data.success) {
          const normalizedOrders = data.orders
              .filter((order, index, self) =>
                  index === self.findIndex((o) => o._id === order._id))
              .sort((a, b) =>
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

          dispatch(setOrders({
              orders: normalizedOrders,
              total: data.total,
              totalToday: data.totalToday,
          }));
      }
  },
});

export const wsOrdersPrivateConnectionStart = (token: string) => ({
  type: WS_ORDERS_CONNECTION_START,
  payload: { url: `${WS_BASE_URL}orders?token=${token}` },
});

export const wsOrdersPublicConnectionStart = () => ({
  type: WS_ORDERS_CONNECTION_START,
  payload: { url: `${WS_BASE_URL}orders/all` },
});

export const wsOrdersConnectionStop = () => ({
  type: WS_ORDERS_CONNECTION_STOP,
});