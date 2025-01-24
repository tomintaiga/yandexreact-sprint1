import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import curCss from "./burger-ingredients.module.css";

const BurgerIngredients = ({ data, items, setItems }) => {
    const [curTab, setCurTab] = React.useState("bun");

    const addIngredient = (ingredient) => {
        setItems([...items, ingredient]);
    };

    return (
        <>
            <div className={curCss.top_div}>
                <div style={{ display: "flex" }}>
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
                <div className={curCss.products_div}>
                    {data.filter(item => item.type === curTab).map(item => (
                        <Ingredient
                            ingredient={item}
                            key={item._id}
                            handler={addIngredient}
                            counter={items.filter(i => i._id === item._id).length}
                        />
                    ))}
                </div>
            </div>
        </>
    )
};


export default BurgerIngredients;