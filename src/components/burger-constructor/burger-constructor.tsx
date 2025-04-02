import React from 'react';
import { useCallback } from 'react';
import curStyles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { sendOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd';
import { DRAG_INGREDIENT } from '../../services/drag/ingredient';
import BurgerConstructorItem from '../burger-constructo-item/burger-constructor-item';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

import { TBurgerIngredient } from '../../../declarations/burger';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addIngredientToBurger } from '../../thunks/addIngredientToBurger';

// TODO: Не исправлено
const BurgerConstructor: React.FC = () => {
  const items = useAppSelector((store)=> store.burgerIngredients.ingredients);
  const totalPrice = useAppSelector((store)=> store.burgerIngredients.totalPrice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [, dropTarget] = useDrop({
    accept: DRAG_INGREDIENT,
    drop: (item:TBurgerIngredient) => {
      dispatch(addIngredientToBurger(item));
    },
  });

  const handleOrder = useCallback(() => {
    const token = getCookie('token');
    if (token) {
      sendOrder(dispatch, items);
    } else {
      navigate('/login', { replace: false });
    }
  }, [dispatch, items, navigate]);

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
