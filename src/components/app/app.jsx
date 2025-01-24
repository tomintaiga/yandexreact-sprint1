import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import data from "../../utils/data";
import curStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";

function App() {
    const [curItems, setCurItems] = React.useState([]);

    return (
        <div className={curStyle.root_div}>
            <AppHeader />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <p style={{ marginTop: "40px", marginBottom: "20px" }} className="text text_type_main-large">Соберите бургер</p>
                    <BurgerIngredients data={data} items={curItems} setItems={setCurItems} />
                </div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <BurgerConstructor items={curItems} setItems={setCurItems}/>
                </div>
            </div>
        </div>
    );
}

export default App;