import curStyle from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';
import item from "../../utils/proptypes";
import { useDispatch } from 'react-redux';
import { SHOW_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import { useDrag } from 'react-dnd';
import {DRAG_INGREDIENT} from '../../services/drag/ingredient';

const Ingredient = ({ ingredient }) => {
    const [isActive, setIsActive] = React.useState("text_color_inactive");
    const dispatch = useDispatch();
    const [{ isDragging }, dragRef] = useDrag({
        type: DRAG_INGREDIENT,
        item: ingredient,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const clickHandler = () => {
        dispatch({
            type:SHOW_INGREDIENT_DETAILS,
            payload: ingredient
        });
    }

    return (
        <div className={`${curStyle.ingredient} ${isDragging ? curStyle.dragging : ""}`}
            onMouseEnter={() => setIsActive("")}
            onMouseLeave={() => setIsActive("text_color_inactive")}
            onClick={clickHandler}
            id={ingredient._id}
            ref={dragRef}>
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