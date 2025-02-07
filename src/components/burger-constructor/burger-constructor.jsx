import React from 'react';
import curStyles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { removeIngredient } from '../../services/actions/burger-constructor';

const BurgerConstructor = ({setItems, showOrder }) => {
    const items = useSelector(store => store.burger.ingredients);
    const dispatch = useDispatch();

    const price = React.useMemo(() => {
        let newPrice = 0;
        items.forEach(item => {
            newPrice += item.price;
        });
        return newPrice;
    }, [items]);

    const handleDelete = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const handleMouseEnter = (event) => {
        event.currentTarget.style.cursor = 'grab';
    };

    const handleMouseExit = (event) => {
        event.currentTarget.style.cursor = 'arrow';
    };

    return (
        <div className={curStyles.topdiv}>
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
                <p className={`text text_type_digits-medium ${curStyles.price}`} >{price}</p>
                <CurrencyIcon type="primary" />
                <span className={curStyles.order_btn}>
                    <Button type="primary"
                        size="medium"
                        htmlType="button"
                        onClick={showOrder}>
                        Оформить заказ
                    </Button>
                </span>
            </div>
        </div>
    );
}

BurgerConstructor.propTypes = {
    setItems: PropTypes.func.isRequired,
    showOrder: PropTypes.func.isRequired
};

export default BurgerConstructor;