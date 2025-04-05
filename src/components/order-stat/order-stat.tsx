import React from 'react';
import curStyle from './order-stat.module.css';
import { useAppSelector } from '../../app/hooks';
import OrderStatList from '../order-stat-list/order-stat-list';
import StatTotal from '../stat-total/stat-total';

const OrderStat: React.FC = () => {
  const { total, totalToday, orders } = useAppSelector(
    (state) => state.wsOrders,
  );
  const doneOrders = orders
    .filter((order) => order.status === 'done')
    .slice(0, 10);
  const pendingOrders = orders
    .filter((order) => order.status !== 'done')
    .slice(0, 10);

  return (
    <div className={curStyle.stat_div}>
      <div className={curStyle.order_list_top}>
        <OrderStatList orders={doneOrders} title="Готовы:" numberColor="green"/>
        <OrderStatList orders={pendingOrders} title="В работе:" />
      </div>
      <StatTotal total={total} title="Выполнено за все время:" />
      <StatTotal total={totalToday} title="Выполнено за сегодня:" />
    </div>
  );
};

export default OrderStat;
