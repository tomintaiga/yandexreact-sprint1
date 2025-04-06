import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import curStyle from './profile-order.module.css';
import OrderListItem from '../order-list-item/order-list-item';
import { wsOrdersPrivateConnectionStart, wsOrdersConnectionStop } from '../../middleware/order-middleware';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

const ProfileOrder: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);
  const navigate = useNavigate();

  const { orders, wsConnected } = useAppSelector(
    (state) => state.wsOrders,
  );

  useEffect(() => {
    if (!wsConnected && !isMounted.current) {
      isMounted.current = true;

      let token = getCookie('token');
      if (!token) {
        navigate('/login');
        return;
      }

      token = token.split(' ')[1];
      if (token === undefined) {
        console.error('Token is undefined', token);
        navigate('/login');
        return;
      }

      dispatch(wsOrdersPrivateConnectionStart(token));
    }

    return () => {
      if (wsConnected) {
        dispatch(wsOrdersConnectionStop());
      }
    };
  }, [dispatch, wsConnected, navigate]);

  return (
    <div className={curStyle.root_div}>
      {orders.map((order) => (
        <OrderListItem key={order._id} order={order} urlPrefix='/profile/orders' />
      ))}
    </div>
  );
};

export default ProfileOrder;
