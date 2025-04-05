import React from 'react';
import SingleOrder from '../../components/single-order/single-order';
import { useLocation } from 'react-router-dom';
import Centered from '../../components/centered/centered';
import curStyle from './order.module.css';

const Order: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className={curStyle.root_div}>
      <Centered>
        {order ? <SingleOrder order={order} /> : <p className="text text_type_main-large">Заказ не найден</p>}
      </Centered>
    </div>
  );
};

export default Order;
