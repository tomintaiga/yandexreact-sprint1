import curStyle from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';
import item from "../../utils/proptypes";
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient } from '../../services/actions/burger-constructor';
import { SHOW_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';

const Ingredient = ({ ingredient }) => {
    const [isActive, setIsActive] = React.useState("text_color_inactive");
    const dispatch = useDispatch();
    const items = useSelector(state => state.burger.ingredients);

    const clickHandler = () => {
        addIngredient(dispatch, ingredient, items);
        dispatch({
            type:SHOW_INGREDIENT_DETAILS,
            payload: ingredient
        });
    }

    return (
        <div className={curStyle.ingredient}
            onMouseEnter={() => setIsActive("")}
            onMouseLeave={() => setIsActive("text_color_inactive")}
            onClick={clickHandler}>
            {ingredient.count > 0 && <Counter count={ingredient.count} size="default" className={curStyle.counter} />}
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
};

export default Ingredient;