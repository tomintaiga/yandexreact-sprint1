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

function App() {
    //######
    const dispatch = useDispatch();
    const showDetail = useSelector(state => state.ingredientDetail.showDetail);
    //######
    const [orderVisible, setOrderVisible] = React.useState(false);

    // Получить ингредиенты
    React.useState(() => {
        dispatch(loadIngredients);
    }, []);

    const showOrder = () => {
        setOrderVisible(true);
    }

    return (
        <div className={curStyle.root_div}>
            <AppHeader />
            <div className={curStyle.main_div}>
                <div className={curStyle.child_div}>
                    <p className={`text text_type_main-large ${curStyle.constructor_title}`}>Соберите бургер</p>
                    <BurgerIngredients />
                </div>
                <div className={curStyle.child_div}>
                    <BurgerConstructor showOrder={showOrder} />
                </div>
            </div>
            {showDetail && (
                <Modal isOpen={showDetail} title="Детали ингредиента" onClose={() => dispatch({type:HIDE_INGREDIENT_DETAILS})}>
                    <IngredientDetails />
                </Modal>
            )}
            {orderVisible && (
                <Modal isOpen={orderVisible} onClose={() => { setOrderVisible(false) }}>
                    <OrderDetails />
                </Modal>
            )}
        </div>
    );
}

export default App;