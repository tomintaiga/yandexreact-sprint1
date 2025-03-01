import { useCallback } from 'react';
import curStyles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd';
import { DRAG_INGREDIENT } from '../../services/drag/ingredient';
import { addIngredient } from '../../services/actions/burger-constructor';
import BurgerConstructorItem from '../burger-constructo-item/burger-constructor-item';
import { useNavigate } from 'react-router-dom';

const BurgerConstructor = () => {
  const items = useSelector((store) => store.burger.ingredients);
  const totalPrice = useSelector((store) => store.burger.totalPrice);
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.auth.isAuth);
  const navigate = useNavigate();

  const [, dropTarget] = useDrop({
    accept: DRAG_INGREDIENT,
    drop: (item) => {
      addIngredient(dispatch, item, items);
    },
  });

  const handleOrder = useCallback(() => {
    if (isAuth) {
      sendOrder(dispatch, items);
    } else {
      navigate('/login', { replace: false });
    }
  }, [isAuth, dispatch, items, navigate]);

  return (
    <div className={curStyles.topdiv} ref={dropTarget}>
      {items.length > 0 && (
        <BurgerConstructorItem isTop={true} item={items[0]} />
      )}
      <div className={curStyles.burger_contructor_div}>
        {items.slice(1, -1).map((item) => (
          <BurgerConstructorItem key={item.id} item={item} />
        ))}
      </div>
      {items.length > 1 && (
        <BurgerConstructorItem isBottom={true} item={items[items.length - 1]} />
      )}
      <div className={curStyles.total_price_div}>
        <p className={`text text_type_digits-medium ${curStyles.price}`}>
          {totalPrice}
        </p>
        <CurrencyIcon type="primary" />
        <span className={curStyles.order_btn}>
          <Button
            type="primary"
            size="medium"
            htmlType="button"
            onClick={handleOrder}
          >
            Оформить заказ
          </Button>
        </span>
      </div>
    </div>
  );
};

export default BurgerConstructor;
