import React from 'react';
import curStyles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd';
import { DRAG_INGREDIENT } from '../../services/drag/ingredient';
import { addIngredient } from '../../services/actions/burger-constructor';
import BurgerConstructorItem from '../burger-constructo-item/burger-constructor-item';

const BurgerConstructor = () => {
    const items = useSelector(store => store.burger.ingredients );
    const totalPrice = useSelector(store => store.burger.totalPrice);
    const dispatch = useDispatch();

    const [, dropTarget] = useDrop({
        accept: DRAG_INGREDIENT,
        drop: (item) => {
            addIngredient(dispatch, item, items);
        }
    });

    return (
        <div className={curStyles.topdiv} ref={dropTarget}>
            {items.length > 0 && (
                <BurgerConstructorItem isTop={true} item={items[0]} />
            )}
            <div className={curStyles.burger_contructor_div}>
                {items.slice(1, -1).map((item, index) => (
                    <BurgerConstructorItem key={index + 1} item={item} />
                ))}
            </div>
            {items.length > 1 && (
                <BurgerConstructorItem isBottom={true} item={items[items.length - 1]} />
            )}
            <div className={curStyles.total_price_div}>
                <p className={`text text_type_digits-medium ${curStyles.price}`} >{totalPrice}</p>
                <CurrencyIcon type="primary" />
                <span className={curStyles.order_btn}>
                    <Button type="primary"
                        size="medium"
                        htmlType="button"
                        onClick={() => sendOrder(dispatch, items)}>
                        Оформить заказ
                    </Button>
                </span>
            </div>
        </div>
    );
}

export default BurgerConstructor;