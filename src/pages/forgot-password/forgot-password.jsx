import curStyle from "./forgot-password.module.css";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

const ForgotPassword = () => {
    return (
        <div className={curStyle.top_div}>
            <div className={curStyle.child_div}>
                <p className="text text_type_main-default">Восстановление пароля</p>
                <EmailInput
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    name={'email'}
                    placeholder={'E-mail'} />
                <Button htmlType="button" type="primary" size="medium">
                    Восстановить
                </Button>
                <p className={`text text_type_main-default text_color_inactive ${curStyle.login_p}`}>
                    Вспомнили пароль?&nbsp;
                    <a href="#">Войти</a>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;