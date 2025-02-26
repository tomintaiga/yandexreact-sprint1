import curStyle from "./forgot-password.module.css";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { forgotPassword } from "../../services/actions/forgot-password";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");

    const handleForgotPassword = (e) => {
        e.preventDefault();
        forgotPassword(dispatch, email);
    }

    return (
        <div className={curStyle.top_div}>
            <form className={curStyle.child_div}>
                <p className="text text_type_main-default">Восстановление пароля</p>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    placeholder={'E-mail'} />
                <Button htmlType="submit" type="primary" size="medium" onClick={handleForgotPassword} >
                    Восстановить
                </Button>
                <p className={`text text_type_main-default text_color_inactive ${curStyle.login_p}`}>
                    Вспомнили пароль?&nbsp;
                    <Link to="/login">Войти</Link>
                </p>
            </form>
        </div>
    );
}

export default ForgotPassword;