import React, { useEffect, useRef, useState } from 'react';
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

const Order: React.FC = () => {
  const { id } = useParams();
  const isFeed = useMatch('/feed/:id');
  const isProfile = useMatch('/profile/orders/:id');
  const isMounted = useRef(false);
  const { orders, wsConnected } = useAppSelector((state) => state.wsOrders);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Подключаемся к WebSocket и отслеживаем изменения orders
  useEffect(() => {
    if (!wsConnected && !isMounted.current) {
      isMounted.current = true;
      if (isFeed) {
        dispatch(wsOrdersPublicConnectionStart());
      } else if (isProfile) {
        const token = getCookie('token');
        if (!token) {
          console.error('Token not found');
          navigate('/login');
          return;
        }
        dispatch(wsOrdersPrivateConnectionStart(token));
      }
    }

    return () => {
      if (wsConnected) {
        dispatch(wsOrdersConnectionStop());
      }
    };
  }, [dispatch, wsConnected, isFeed, isProfile, navigate]);

  // Отслеживаем появление заказа в store
  useEffect(() => {
    if (orders.length > 0) {
      setIsLoading(false);
    }
  }, [orders]);

  const storeOrder = orders.find((order) => order._id === id);

  if (isLoading) {
    return (
      <Centered>
        <p className="text text_type_main-large">Загрузка данных заказа...</p>
      </Centered>
    );
  }

  if (!storeOrder) {
    return (
      <Centered>
        <p className="text text_type_main-large">Заказ не найден</p>
      </Centered>
    );
  }

  return <Centered><SingleOrder order={storeOrder} /></Centered>;
};

export default Order;
