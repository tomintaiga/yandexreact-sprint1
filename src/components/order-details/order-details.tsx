import curStyle from './order-details.module.css';
import check from '../../assets/check.svg';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useCreateOrderMutation } from '../../api/order';
import { clearConstructor } from '../../thunks/clearConstructor';

const OrderDetails: React.FC = () => {
  const order = useAppSelector((state) => state.singleOrder.order);
  const items = useAppSelector((store) => store.burgerIngredients.ingredients);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const orderCreatedRef = useRef(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (items.length > 0 && !orderCreatedRef.current) {
      orderCreatedRef.current = true;
      const ingredients = items.map((item) => item._id);
      createOrder({ ingredients }).unwrap();
    }
  }, [items, createOrder]);

  useEffect(() => {
    if (order !== null) {
      dispatch(clearConstructor());
    }
  }, [order, dispatch]);

  if (isLoading) {
    return (
      <div className={curStyle.order_root}>
        <p className="text text_type_main-default">Создаем заказ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={curStyle.order_root}>
        <p className="text text_type_main-default">
          Ошибка создания заказа. Повторите заказ позже
        </p>
      </div>
    );
  }

  if (order !== null) {
    return (
      <div className={curStyle.order_root}>
        <p className={`text text_type_digits-large ${curStyle.order_number}`}>
          {order.number}
        </p>
        <p
          className={`text text_type_main-medium ${curStyle.order_number_caption}`}
        >
          идентификатор заказа
        </p>
        <img src={check} alt="done" className={curStyle.order_number_caption} />
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p
          className={`text text_type_main-default text_color_inactive ${curStyle.order_number_caption}`}
        >
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    );
  }
};

export default OrderDetails;
