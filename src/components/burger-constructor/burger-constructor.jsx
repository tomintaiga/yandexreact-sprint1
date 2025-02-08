import React from 'react';
import curStyles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from 'react-redux';
import { removeIngredient } from '../../services/actions/burger-constructor';
import { sendOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd';
import { DRAG_INGREDIENT } from '../../services/drag/ingredient';
import { addIngredient } from '../../services/actions/burger-constructor';

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

    const handleMouseEnter = (event) => {
        event.currentTarget.style.cursor = 'grab';
    };

    const handleMouseExit = (event) => {
        event.currentTarget.style.cursor = 'arrow';
    };

    return (
        <div className={curStyles.topdiv} ref={dropTarget}>
            {items.length > 0 && (
                <div className={curStyles.constructor_element}>
                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type="top"
                        text={`${items[0].name}\n(верх)`}
                        price={items[0].price}
                        thumbnail={items[0].image}
                        isLocked={true}
                    />
                </div>
            )}
            <div className={curStyles.burger_contructor_div}>
                {items.slice(1, -1).map((item, index) => (
                    <div className={curStyles.constructor_element} key={index + 1}>
                        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
                            <DragIcon type="primary" />
                        </div>
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                            handleClose={() => removeIngredient(dispatch, item)}
                        />
                    </div>
                ))}
            </div>
            {items.length > 1 && (
                <div className={curStyles.constructor_element}>
                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type="bottom"
                        text={`${items[items.length - 1].name}\n(низ)`}
                        price={items[items.length - 1].price}
                        thumbnail={items[items.length - 1].image}
                        isLocked={true}
                    />
                </div>
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