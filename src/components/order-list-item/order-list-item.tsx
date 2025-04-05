import React from 'react';
import curStyle from './order-list-item.module.css';
import { IWsOrder } from '../../../declarations/ws-order';

const OrderListItem: React.FC<{ order: IWsOrder }> = ({ order }) => {
  return (
    <div className={curStyle.item}>
      <p className="text text_type_digits-default">{order.number}</p>
      <p className="text text_type_main-default text_color_inactive">{order.createdAt}</p>
        <p className="text text_type_main-default">{order.name}</p>
      <p className="text text_type_main-default text_color_inactive">
        {order.status}
      </p>
    </div>
  );
};

export default OrderListItem;
