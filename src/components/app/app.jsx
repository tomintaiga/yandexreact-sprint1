import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import data from "../../utils/data";
import curStyle from "./app.module.css";

function App() {
    return (
        <div className={curStyle.root_div}>
            <AppHeader />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <p style={{marginTop: "40px", marginBottom: "20px"}} className="text text_type_main-large">Соберите бургер</p>
                    <BurgerIngredients data={data} />
                </div>
            </div>
        </div>
    );
}

export default App