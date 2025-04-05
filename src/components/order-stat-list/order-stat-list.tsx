import React from 'react';
import { IWsOrder } from '../../../declarations/ws-order';
import curStyle from './order-stat-list.module.css';

interface IOrderStatListProps {
  orders: IWsOrder[];
  title: string;
  numberColor?: "default" | "green" | "light";
}

const OrderStatList: React.FC<IOrderStatListProps> = ({
  orders,
  title,
  numberColor = 'default',
}) => {
  return (
    <div className={curStyle.container}>
      <p className={`text text_type_main-medium ${curStyle.title}`}>{title}</p>
      <div className={curStyle.order_list}>
        {orders.map((order) => (
          <p
            key={order._id}
            className={`text text_type_digits-default ${curStyle.order_number} ${curStyle[numberColor]}`}
          >
            {order.number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default OrderStatList;
