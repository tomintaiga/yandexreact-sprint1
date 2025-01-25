import React from 'react';
import curStyles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import item from "../../utils/proptypes";

const BurgerConstructor = ({ items, setItems, showOrder }) => {
    const [price, setPrice] = React.useState(0);

    React.useEffect(() => {
        updatePrice();
    }, [items]);

    const handleDelete = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const updatePrice = () => {
        let newPrice = 0;
        items.forEach(item => {
            newPrice += item.price;
        });
        setPrice(newPrice);
    };

    return (
        <div className={curStyles.burger_contructor_div}>
            {items.map((item, index) => {
                let type = "";
                let caption = item.name;
                let isLocked = false;
                if (index === 0) {
                    type = "top";

                    if (item.type === "bun") {
                        caption += "\n(верх)";
                    }

                    isLocked = true;
                } else if (index === items.length - 1) {
                    type = "bottom";
                    if (item.type === "bun") {
                        caption += "\n(низ)";
                    }

                    isLocked = true;
                }

                return (
                    <ConstructorElement
                        type={type}
                        key={index}
                        text={caption}
                        price={item.price}
                        thumbnail={item.image}
                        isLocked={isLocked}
                        handleClose={() => handleDelete(index)}
                    />
                )
            })}
            <div className={curStyles.total_price_div}>
                <p className="text text_type_digits-medium" style={{ marginRight: "8px" }}>{price}</p>
                <CurrencyIcon type="primary" />
                <Button type="primary" size="medium" htmlType="button" style={{ marginLeft: "40px" }} onClick={showOrder}>Оформить заказ</Button>
            </div>
        </div>
    );
}

BurgerConstructor.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(item)).isRequired,
    setItems: PropTypes.func.isRequired,
    showOrder: PropTypes.func.isRequired
};

export default BurgerConstructor;