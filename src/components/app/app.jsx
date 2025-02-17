import Root from "../../pages/root/root";
import Main from "../../pages/main/main";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import Ingredient from "../../pages/ingredient/ingredient";
import NotFound from "../../pages/not-found/not-found";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadIngredients } from "../../services/actions/ingredient";
import { useState } from "react";

function App() {
    const dispatch = useDispatch();

    useState(() => {
        dispatch(loadIngredients);
    }, []);

    return (
        <BrowserRouter>
            <Root>
                <Routes>
                    <Route path="/" Component={Main} exact />
                    <Route path="/register" Component={Register} exact />
                    <Route path="/login" Component={Login} exact />
                    <Route path="/forgot-password" Component={ForgotPassword} exact />
                    <Route path="/reset-password" Component={ResetPassword} exact />
                    <Route path="/profile" Component={Profile} exact />
                    <Route path="/ingredients/:id" Component={Ingredient} exact />
                    <Route path="*" Component={NotFound} />
                </Routes>

            </Root>
        </BrowserRouter>
    );
}

export default App;