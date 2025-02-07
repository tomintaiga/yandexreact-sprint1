import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import curStyle from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import item from "../../utils/proptypes";

import { useSelector, useDispatch } from 'react-redux';

const BurgerIngredients = ({items, setItems, showDetail }) => {
    // ########
    const data = useSelector(state => state.ingredient.ingredients);
    // ########
    const [curTab, setCurTab] = React.useState("bun");

    const addIngredient = (ingredient) => {
        showDetail(ingredient);

        // Получаем количество булочер
        const count = items.filter(item => item.type === "bun").length;

        // Проверка на количество булок
        if(ingredient.type === "bun") {
            const count = items.filter(item => item.type === "bun").length;

            // Если булок нет - добавляем сразу две в начало и конец
            if(count === 0) {
                setItems([ingredient, ...items, ingredient]);
                return;
            } else {
                // Если булка уже есть, значит их две и не делаем ничего
                return
            }
        }

        // Если булочек нет - просто добавляем куда-то
        if(count === 0) {
            setItems([ingredient, ...items]);
            return
        }

        // Начинка должна быть между булками =)
        setItems([items[0], ingredient, ...items.slice(1)]);
    };
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
                                handler={addIngredient}
                                counter={items.filter(i => i._id === item._id).length}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
};

BurgerIngredients.propTypes = {
    items: PropTypes.array.isRequired,
    setItems: PropTypes.func.isRequired,
    showDetail: PropTypes.func.isRequired
};

export default BurgerIngredients;