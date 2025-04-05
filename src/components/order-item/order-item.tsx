import React from 'react';
import { TOrder } from '../../../declarations/order'
import curStyle from './order-item.module.css';

const OrderDetails: React.FC<{ order: TOrder }> = ({ order }) => {
  return (
    <div className={curStyle.item}>
        <p className="text text_type_digits-default">{order.number}</p>
        <p className="text text_type_main-default">{order.name}</p>
        <p className="text text_type_main-default text_color_inactive">
            {order.status}
        </p>
        <p className="text text_type_digits-default">{order.createdAt}</p>
    </div>
  );
};

export default OrderDetails;
