import curStyle from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';
import item from "../../utils/proptypes";

const Ingredient = ({ ingredient, handler, counter }) => {
    const [isActive, setIsActive] = React.useState("text_color_inactive");

    return (
        <div className={curStyle.ingredient}
            onMouseEnter={() => setIsActive("")}
            onMouseLeave={() => setIsActive("text_color_inactive")}
            onClick={() => handler(ingredient)}>
            {counter > 0 && <Counter count={counter} size="default" className={curStyle.counter} />}
            <img src={ingredient.image} alt={ingredient.name} className={curStyle.img} />
            <p className={`text text_type_digits-default ${isActive} ${curStyle.currency_p}`}>
                {ingredient.price}
                <span className={curStyle.currency_icon}>
                    <CurrencyIcon type="primary" />
                </span>
            </p>
            <p className={`text text_type_main-default ${isActive}`}>{ingredient.name}</p>
        </div>
    );
};

Ingredient.propTypes = {
    ingredient: PropTypes.shape(item).isRequired,
    handler: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
};

export default Ingredient;