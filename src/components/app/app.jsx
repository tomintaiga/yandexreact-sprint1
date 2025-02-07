import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import curStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

import { useDispatch } from 'react-redux';
import { loadIngredients } from "../../services/actions/ingredient";

function App() {
    //######
    const dispatch = useDispatch();
    //######
    const [curItems, setCurItems] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [detailVisible, setDetailVisible] = React.useState(false);
    const [detailData, setDetailData] = React.useState({});
    const [orderVisible, setOrderVisible] = React.useState(false);

    // Получить ингредиенты
    React.useState(() => {
        dispatch(loadIngredients);
    }, []);

    const showDetail = (item) => {
        setDetailData(item);
        setDetailVisible(true);
    }

    const showOrder = () => {
        setOrderVisible(true);
    }

    return (
        <div className={curStyle.root_div}>
            <AppHeader />
            <div className={curStyle.main_div}>
                <div className={curStyle.child_div}>
                    <p className={`text text_type_main-large ${curStyle.constructor_title}`}>Соберите бургер</p>
                    <BurgerIngredients items={curItems} setItems={setCurItems} showDetail={showDetail} />
                </div>
                <div className={curStyle.child_div}>
                    <BurgerConstructor setItems={setCurItems} showOrder={showOrder} />
                </div>
            </div>
            {detailVisible && (
                <Modal isOpen={detailVisible} title="Детали ингредиента" onClose={() => { setDetailVisible(false) }}>
                    <IngredientDetails ingredient={detailData} />
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