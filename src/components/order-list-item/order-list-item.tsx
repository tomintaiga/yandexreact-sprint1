import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import curStyle from './order-list-item.module.css';
import { IWsOrder } from '../../../declarations/ws-order';
import OrderItemIngredientList from '../order-item-ingredient-list/order-item-ingredient-list';
import { formatRelativeDate } from '../../utils/date';

const OrderListItem: React.FC<{ order: IWsOrder }> = ({ order }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => navigate(`/feed/${order.number}`, { state: { order } });

  return (
    <div
      className={`${curStyle.item} ${isHovered ? curStyle.item_hovered : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={curStyle.item_container}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">{formatRelativeDate(order.createdAt)}</p>
      </div>
      <p className="text text_type_main-default">{order.name}</p>
      <OrderItemIngredientList ingredients={order.ingredients} />
    </div>
  );
};

export default OrderListItem;
