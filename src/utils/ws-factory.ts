import { Middleware } from 'redux';
import { AppDispatch } from '../app/store';

// Конфиг для мидлевари
export interface IWsMiddlewareActions {
  // Команды
  wsInit: string; // Подключение
  wsSendMessage?: string; // Отправка сообщения
  wsClose?: string; // Закрытие соединения

  // События
  onOpen: (dispatch: AppDispatch) => void; // Соединение установлено
  onClose: (dispatch: AppDispatch) => void; // Соединение разорвано
  onError: (dispatch: AppDispatch, error: string) => void; // Ошибка
  onMessage: (dispatch: AppDispatch, data: any) => void; // Получено сообщение
}


// В зависимости от переданных аргументов, создается middleware под конкретные требования и задачи
export const createSocketMiddleware = (
  wsActions: IWsMiddlewareActions,
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store as { dispatch: AppDispatch };
      const { type, payload } = action;

      if (type === wsActions.wsInit) {
        if (socket) {
          socket.close();
        }

        socket = new WebSocket(payload.url);
        console.log('Connecting to WebSocket:', payload.url);

        socket.onopen = () => {
          wsActions.onOpen(dispatch);
        };

        socket.onerror = (_event) => {
          wsActions.onError(dispatch, 'WebSocket error');
        };

        socket.onclose = () => {
          wsActions.onClose(dispatch);
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            wsActions.onMessage(dispatch, data);
          } catch (err) {
            wsActions.onError(dispatch, 'Invalid message format');
          }
        };
      }

      if (type === wsActions.wsClose && socket) {
        socket.close();
      }

      if (
        wsActions.wsSendMessage &&
        type === wsActions.wsSendMessage &&
        socket?.readyState === WebSocket.OPEN
      ) {
        socket.send(JSON.stringify(payload));
      }

      return next(action);
    };
  };
};
