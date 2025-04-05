import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import curStyle from './order-list.module.css';
import OrderListItem from '../order-list-item/order-list-item';
import {
  wsOrdersPublicConnectionStart,
} from '../../middleware/order-middleware';

const OrderList: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);
  const { orders, wsConnected } = useAppSelector(
    (state) => state.wsOrders,
  );

  useEffect(() => {
    if (!wsConnected && !isMounted.current) {
      isMounted.current = true;
      dispatch(wsOrdersPublicConnectionStart());
    }
  }, [dispatch, wsConnected]);

  return (
    <div className={curStyle.list}>
      {orders.map((order) => (
        <OrderListItem key={order._id} order={order} />
      ))}
    </div>
  );
};
export default OrderList;
