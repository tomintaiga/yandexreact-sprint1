import React from 'react';
import curStyle from './main.module.css';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import OrderDetails from '../../components/order-details/order-details';

import { loadIngredients } from '../../services/actions/ingredient';
import { HIDE_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import { HIDE_ORDER } from '../../services/actions/order';

import { useDispatch, useSelector } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Main = () => {

    const dispatch = useDispatch();
    const showDetail = useSelector(state => state.ingredientDetail.showDetail);
    const showOrder = useSelector(state => state.order.showOrder);

    // Получить ингредиенты
    React.useState(() => {
        dispatch(loadIngredients);
    }, []);

    return (
        <>
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
        </>
    )
}

export default Main;