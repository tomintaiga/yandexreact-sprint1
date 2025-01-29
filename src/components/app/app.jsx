import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import curStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import constData from "../../utils/data";

const url = "https://norma.nomoreparties.space/api/ingredients";

// Сортировка ингредиентов
const sortIngredients = (data) => {
    const buns = data.filter(item => item.type === "bun");
    const sauces = data.filter(item => item.type === "sauce");
    const mains = data.filter(item => item.type === "main");
    return [...buns, ...sauces, ...mains];
}

function App() {
    const [curItems, setCurItems] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [detailVisible, setDetailVisible] = React.useState(false);
    const [detailData, setDetailData] = React.useState({});
    const [orderVisible, setOrderVisible] = React.useState(false);
    const sortedIngredients = React.useMemo(() => {
        return sortIngredients(data);
    }, [data]); // Вынес затратную операцию в useMemo

    // Получить ингредиенты
    React.useState(() => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(data => {
                // Проверка ответа сервера
                if (data.success === true) {
                    setData(data.data);

                    // TODO: Удалить позже
                    setCurItems(constData);
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
                    <BurgerIngredients data={sortedIngredients} items={curItems} setItems={setCurItems} showDetail={showDetail} />
                </div>
                <div className={curStyle.child_div}>
                    <BurgerConstructor items={curItems} setItems={setCurItems} showOrder={showOrder} />
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