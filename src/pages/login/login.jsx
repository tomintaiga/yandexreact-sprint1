import curStyles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const Login = () => {
    return (
        <div className={curStyles.top_div}>
            <div className={curStyles.child_div}>
                <p className="text text_type_main-default">Вход</p>
                <EmailInput
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    name={'email'}
                    placeholder={'E-mail'}
                />
                <PasswordInput
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    name={'password'}
                    placeholder={'Пароль'}
                    extraClass="mb-2"
                />
                <Button htmlType="button" type="primary" size="medium">
                    Войти
                </Button>
                <p className={`text text_type_main-default text_color_inactive ${curStyles.login_p}`}>
                    Забыли пароль?&nbsp;
                    <a href="#">Восстановить пароль</a>
                </p>
                <p className={`text text_type_main-default text_color_inactive ${curStyles.restore_p}`}>
                    Вы новый пользователь?&nbsp;
                    <a href="#">Зарегистрироваться</a>
                </p>
            </div>
        </div>
    )
}

export default Login;