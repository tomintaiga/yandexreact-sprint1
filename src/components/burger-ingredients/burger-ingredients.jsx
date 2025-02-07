import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import curStyle from "./burger-ingredients.module.css";
import { useSelector } from 'react-redux';

const BurgerIngredients = () => {
    // ########
    const data = useSelector(state => state.ingredient.ingredients);
    // ########
    const [curTab, setCurTab] = React.useState("bun");

    return (
        <>
            <div className={curStyle.top_div}>
                <div className={curStyle.tabs}>
                    <Tab value="bun" active={curTab === "bun"} onClick={setCurTab}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={curTab === "sauce"} onClick={setCurTab}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={curTab === "main"} onClick={setCurTab}>
                        Начинки
                    </Tab>
                </div>
                <div className={curStyle.products_div}>
                    {data.map(item => {
                        return  (
                            <Ingredient
                                ingredient={item}
                                key={item._id}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
};

export default BurgerIngredients;