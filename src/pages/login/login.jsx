import curStyles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Centered from '../../components/centered/centered';
import { Link, Navigate } from 'react-router-dom';
import { login } from '../../services/actions/auth';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isLoginRequest = useSelector(store => store.auth.isLoginRequest);
    const isLoginError = useSelector(store => store.auth.isLoginError);
    const isAuth = useSelector(store => store.auth.isAuth);

    if(isAuth) {
        return (
            <Navigate to="/" />
        )
    }

    return (
        <Centered>
            <p className="text text_type_main-default">Вход</p>
            {isLoginError && <p className="text text_type_main-default text_color_inactive">Ошибка авторизации</p>}
            {isLoginRequest && <p className="text text_type_main-default text_color_inactive">Загрузка...</p>}
            <EmailInput
                onChange={e => setEmail(e.target.value)}
                value={email}
                name={'email'}
                placeholder={'E-mail'}
            />
            <PasswordInput
                onChange={e => setPassword(e.target.value)}
                value={password}
                name={password}
                placeholder={'Пароль'}
                extraClass="mb-2"
            />
            <Button
                htmlType="button"
                type="primary"
                size="medium"
                onClick={() => login(dispatch, email, password)}>
                Войти
            </Button>
            <p className={`text text_type_main-default text_color_inactive ${curStyles.login_p}`}>
                Забыли пароль?&nbsp;
                <Link to="/forgot-password">Восстановить пароль</Link>
            </p>
            <p className={`text text_type_main-default text_color_inactive ${curStyles.restore_p}`}>
                Вы новый пользователь?&nbsp;
                <Link to="/register">Зарегистрироваться</Link>
            </p>
        </Centered >
    )
}

export default Login;