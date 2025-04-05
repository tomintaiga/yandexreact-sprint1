import React from 'react';
import curStyle from './order-list-item.module.css';
import { IWsOrder } from '../../../declarations/ws-order';
import OrderItemIngredientList from '../order-item-ingredient-list/order-item-ingredient-list';

const OrderListItem: React.FC<{ order: IWsOrder }> = ({ order }) => {
  return (
    <div className={curStyle.item}>
      <div className={curStyle.item_container}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">{order.createdAt}</p>
      </div>
      <p className="text text_type_main-default">{order.name}</p>
      <OrderItemIngredientList ingredients={order.ingredients} />
      <p className="text text_type_main-default text_color_inactive">
        {order.status}
      </p>
    </div>
  );
};

export default OrderListItem;
