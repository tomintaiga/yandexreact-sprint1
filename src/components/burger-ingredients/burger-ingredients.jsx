import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import curCss from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import item from "../../utils/proptypes";

const BurgerIngredients = ({ data, items, setItems, showDetail }) => {
    const [curTab, setCurTab] = React.useState("bun");

    const addIngredient = (ingredient) => {
        showDetail(ingredient);

        // Проверка на количество булок
        if(ingredient.type === "bun") {
            const count = items.filter(item => item.type === "bun").length;

            // Если булок слишком много - на выход
            if(count >= 2) {
                return;
            }

            // Если булок нет - наша станет первой
            if(count === 0) {
                setItems([ingredient, ...items]);
                return
            }

            // Если булка уже есть - ставим в конец
            if (count === 1) {
                setItems([...items, ingredient]);
                return;
            }
        }

        // Начинка должна быть между булками =)
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

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(item)).isRequired,
    items: PropTypes.array.isRequired,
    setItems: PropTypes.func.isRequired,
    showDetail: PropTypes.func.isRequired
};

export default BurgerIngredients;