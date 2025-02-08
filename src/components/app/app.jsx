import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import curStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from "../../services/actions/ingredient";
import { HIDE_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";
import { HIDE_ORDER } from "../../services/actions/order";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    const dispatch = useDispatch();
    const showDetail = useSelector(state => state.ingredientDetail.showDetail);
    const showOrder = useSelector(state => state.order.showOrder);

    // Получить ингредиенты
    React.useState(() => {
        dispatch(loadIngredients);
    }, []);

    return (
        <div className={curStyle.root_div}>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <div className={curStyle.main_div}>
                    <div className={curStyle.child_div}>
                        <p className={`text text_type_main-large ${curStyle.constructor_title}`}>Соберите бургер</p>
                        <BurgerIngredients />
                    </div>
                    <div className={curStyle.child_div}>
                        <BurgerConstructor />
                    </div>
                </div>
            </DndProvider>
            {showDetail && (
                <Modal isOpen={showDetail} title="Детали ингредиента" onClose={() => dispatch({ type: HIDE_INGREDIENT_DETAILS })}>
                    <IngredientDetails />
                </Modal>
            )}
            {showOrder && (
                <Modal isOpen={showOrder} onClose={() => dispatch({ type: HIDE_ORDER })}>
                    <OrderDetails />
                </Modal>
            )}
        </div>
    );
}

export default App;