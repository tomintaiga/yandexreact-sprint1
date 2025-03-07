import curStyle from './order-details.module.css';
import check from '../../assets/check.svg';
import { useSelector } from 'react-redux';
import { TStore } from '../../../declarations/store';

const OrderDetails: React.FC = () => {
  const order = useSelector((state: TStore) => state.order.order);
  const orderLoading = useSelector((state: TStore) => state.order.orderLoading);
  const orderLoadingError = useSelector(
    (state: TStore) => state.order.orderLoadingError,
  );

  if (orderLoading === true) {
    return (
      <div className={curStyle.order_root}>
        <p className="text text_type_main-default">Создаем заказ...</p>
      </div>
    );
  }

  if (orderLoadingError === true) {
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
