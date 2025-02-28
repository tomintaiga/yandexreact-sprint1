import Root from "../../pages/root/root";
import Main from "../../pages/main/main";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import Ingredient from "../../pages/ingredient/ingredient";
import NotFound from "../../pages/not-found/not-found";

import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from "../../services/actions/ingredient";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import Modal from "../modal/modal";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const background = location.state && location.state.background;
    const ingredientId = location.state && location.state.id;
    const ingredient = useSelector((state) => {
        if(!ingredientId) {
            return null;
        }
        return state.ingredient.ingredients.find((item) => item._id === ingredientId);
    });

    useState(() => {
        dispatch(loadIngredients);
    }, []);

    const handleClose = () => {
        console.log("close");
        navigate(-1);
    }

    return (
        <Root>
            <Routes location={background || location}>
                <Route path="/register" Component={Register} exact />
                <Route path="/login" Component={Login} exact />
                <Route path="/forgot-password" Component={ForgotPassword} exact />
                <Route path="/reset-password" Component={ResetPassword} exact />
                <Route path="/" Component={Main} exact />

                <Route path="/profile" element={<ProtectedRouteElement><Profile /></ProtectedRouteElement>} exact />
                <Route path="/ingredients/:id" element={<ProtectedRouteElement><Ingredient /></ProtectedRouteElement>} exact />

                <Route path="*" Component={NotFound} />
            </Routes>

            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal onClose={handleClose} isOpen={true} title={ingredient?.name}>
                            <Ingredient />
                        </Modal>
                    } />
                </Routes>
            )}

        </Root>
    );
}

export default App;