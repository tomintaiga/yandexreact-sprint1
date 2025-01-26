import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import curStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ModalOverlay from "../modal-overlay/modal-overlay";
import OrderDetails from "../order-details/order-details";

const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
    const [curItems, setCurItems] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [detailVisible, setDetailVisible] = React.useState(false);
    const [detailData, setDetailData] = React.useState({});
    const [overlayVisible, setOverlayVisible] = React.useState(false);
    const [orderVisible, setOrderVisible] = React.useState(false);

    // Получить ингредиенты
    React.useState(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // Проверка ответа сервера
                if(data.success === true) {
                    setData(data.data);
                } else {
                    // Обработка ошибки
                    console.log(data.message);
                }
            })
            .catch(err => {
                // Обработка ошибки
                console.log(err);
            });
    }, []);

    const showDetail = (item) => {
        setDetailData(item);
        setDetailVisible(true);
        setOverlayVisible(true);
    }

    const showOrder = () => {
        setOrderVisible(true);
        setOverlayVisible(true);
    }

    return (
        <div className={curStyle.root_div}>
            <AppHeader />
            <div className={curStyle.main_div}>
                <div className={curStyle.child_div}>
                    <p className={`text text_type_main-large ${curStyle.constructor_title}`}>Соберите бургер</p>
                    <BurgerIngredients data={data} items={curItems} setItems={setCurItems} showDetail={showDetail}/>
                </div>
                <div className={curStyle.child_div}>
                    <BurgerConstructor items={curItems} setItems={setCurItems} showOrder={showOrder}/>
                </div>
            </div>
            {detailVisible && (
                <ModalOverlay isOpen={overlayVisible} onClose={() => {setOverlayVisible(false)}}>
                    <Modal isOpen={detailVisible} title="Детали ингредиента" onClose={() => {setDetailVisible(false)}}>
                        <IngredientDetails ingredient={detailData}/>
                    </Modal>
                </ModalOverlay>
            )}
            {orderVisible && (
                <ModalOverlay isOpen={overlayVisible} onClose={() => {setOverlayVisible(false)}}>
                    <Modal isOpen={orderVisible} onClose={() => {setOrderVisible(false)}}>
                        <OrderDetails />
                    </Modal>
                </ModalOverlay>
            )}
        </div>
    );
}

export default App;