import curStyles from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

const Ingredient = ({ ingredient }) => {
    const [isActive, setIsActive] = React.useState("text_color_inactive");
    return (
        <div className={curStyles.ingredient}
            onMouseEnter={() => setIsActive("")}
            onMouseLeave={() => setIsActive("text_color_inactive")}>
            <img src={ingredient.image} alt={ingredient.name} />
            <p style={{ display: "flex", alignItems: "center", marginTop: "4px", marginBottom: "4px" }}
                className={"text text_type_digits-default " + isActive}>
                {ingredient.price}
                <CurrencyIcon type="primary" />
            </p>
            <p className={"text text_type_main-default " + isActive}>{ingredient.name}</p>
        </div>
    );
};

export default Ingredient;