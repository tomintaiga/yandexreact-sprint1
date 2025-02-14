import Root from "../../pages/root/root";
import Main from "../../pages/main/main";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Root>
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={Main} exact />
                    <Route path="/register" Component={Register} exact />
                    <Route path="/login" Component={Login} exact />
                    <Route path="/forgot-password" Component={ForgotPassword} exact />
                    <Route path="/reset-password" Component={ResetPassword} exact />
                </Routes>
            </BrowserRouter>
        </Root>
    );
}

export default App;