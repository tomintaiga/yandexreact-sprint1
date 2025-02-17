import curStyle from "./forgot-password.module.css";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { resetPassword } from "../../services/actions/forgot-password";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");

    return (
        <div className={curStyle.top_div}>
            <div className={curStyle.child_div}>
                <p className="text text_type_main-default">Восстановление пароля</p>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    placeholder={'E-mail'} />
                <Button htmlType="button" type="primary" size="medium" onClick={() => resetPassword(dispatch, email)} >
                    Восстановить
                </Button>
                <p className={`text text_type_main-default text_color_inactive ${curStyle.login_p}`}>
                    Вспомнили пароль?&nbsp;
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;