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
                setData(data.data);
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
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <p style={{ marginTop: "40px", marginBottom: "20px" }} className="text text_type_main-large">Соберите бургер</p>
                    <BurgerIngredients data={data} items={curItems} setItems={setCurItems} showDetail={showDetail}/>
                </div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
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