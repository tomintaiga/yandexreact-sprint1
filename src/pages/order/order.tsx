import React from 'react';
import SingleOrder from '../../components/single-order/single-order';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Centered from '../../components/centered/centered';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const Order: React.FC = () => {
  const { id } = useParams();
  const order = useAppSelector((state) =>
    state.wsOrders.orders.find((item) => item._id === id),
  );
  const navigate = useNavigate();
  const storedOrderJson = localStorage.getItem('order');
  const storedOrder = storedOrderJson ? JSON.parse(storedOrderJson) : null;

  const useOrder = storedOrder || order;

  if (!useOrder) {
    return (
      <Centered>
        <p className="text text_type_main-large">Заказ не найден</p>
        <Button
          type="primary"
          size="medium"
          htmlType="button"
          onClick={() => navigate(-1)}
        >
          Вернуться назад
        </Button>
      </Centered>
    );
  }

  localStorage.setItem('order', JSON.stringify(useOrder));

  return <SingleOrder order={useOrder} />;
};

export default Order;
