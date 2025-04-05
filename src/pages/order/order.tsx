import React from 'react';
import SingleOrder from '../../components/single-order/single-order';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Centered from '../../components/centered/centered';

const Order: React.FC = () => {
  const { id } = useParams();
  const storeOrder = useAppSelector((state) =>
    state.wsOrders.orders.find((order) => order._id === id),
  );


  if (!storeOrder) {
    return (
      <Centered>
        <p className="text text_type_main-large">Заказ не найден</p>
      </Centered>
    );
  }

  return <SingleOrder order={storeOrder} />;
};

export default Order;
