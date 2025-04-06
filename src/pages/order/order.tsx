import React, { useCallback, useEffect, useRef, useState } from 'react';
import SingleOrder from '../../components/single-order/single-order';
import { useParams, useMatch, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Centered from '../../components/centered/centered';
import {
  wsOrdersConnectionStop,
  wsOrdersPrivateConnectionStart,
  wsOrdersPublicConnectionStart,
} from '../../middleware/order-middleware';
import { getCookie } from '../../utils/cookie';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const LOADING_TIMEOUT = 10000; // 10 секунд таймаут

const Order: React.FC = () => {
  const { id } = useParams();
  const isFeed = useMatch('/feed/:id');
  const isProfile = useMatch('/profile/orders/:id');
  const isMounted = useRef(false);
  const {
    orders,
    wsConnected,
    error: wsError,
  } = useAppSelector((state) => state.wsOrders);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [connectionAttempt, setConnectionAttempt] = useState(0);

  // Таймаут загрузки
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setTimeoutReached(true);
      }
    }, LOADING_TIMEOUT);

    return () => clearTimeout(timer);
  }, [isLoading, connectionAttempt]);

  // Подключение к WebSocket
  const connectWebSocket = useCallback(() => {
    setIsLoading(true);
    setTimeoutReached(false);

    if (isFeed) {
      dispatch(wsOrdersPublicConnectionStart());
    } else if (isProfile) {
      const token = getCookie('token');
      if (!token) {
        console.error('Token not found');
        navigate('/login');
        return;
      }
      const accessToken = token.split(' ')[1];
      dispatch(wsOrdersPrivateConnectionStart(accessToken));
    }
  }, [dispatch, isFeed, isProfile, navigate]);

  // Первоначальное подключение
  useEffect(() => {
    if (!wsConnected && !isMounted.current) {
      isMounted.current = true;
      connectWebSocket();
    }

    return () => {
      if (wsConnected) {
        dispatch(wsOrdersConnectionStop());
      }
    };
  }, [dispatch, wsConnected, isFeed, isProfile, navigate, connectWebSocket]);

  // Обработка полученных заказов
  useEffect(() => {
    if (orders.length > 0 || wsError) {
      setIsLoading(false);
    }
  }, [orders, wsError]);

  // Повторная попытка подключения
  const handleRetry = () => {
    setConnectionAttempt((prev) => prev + 1);
    connectWebSocket();
  };

  const storeOrder = orders.find((order) => order._id === id);

  // Обработка ошибок
  if (wsError) {
    return (
      <Centered>
        <p className="text text_type_main-large mb-4">Ошибка соединения</p>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleRetry}
        >
          Повторить попытку
        </Button>
      </Centered>
    );
  }

  // Таймаут загрузки
  if (timeoutReached) {
    return (
      <Centered>
        <p className="text text_type_main-large mb-4">Долгая загрузка</p>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Проверьте интернет-соединение
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleRetry}
        >
          Повторить попытку
        </Button>
      </Centered>
    );
  }

  // Загрузка
  if (isLoading) {
    return (
      <Centered>
        <p className="text text_type_main-large">Загрузка данных заказа...</p>
      </Centered>
    );
  }

  // Заказ не найден
  if (!storeOrder) {
    return (
      <Centered>
        <p className="text text_type_main-large">Заказ не найден</p>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => navigate(-1)}
          className="mt-4"
        >
          Вернуться назад
        </Button>
      </Centered>
    );
  }

  return <SingleOrder order={storeOrder} />;
};

export default Order;
