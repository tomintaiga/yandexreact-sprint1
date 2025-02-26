import curStyles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CenteredForm } from '../../components/centered/centered';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../services/actions/auth';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_LOGIN_SUCCESS } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isLoginRequest = useSelector(store => store.auth.isLoginRequest);
    const isLoginError = useSelector(store => store.auth.isLoginError);
    const isAuth = useSelector(store => store.auth.isAuth);
    const location = useLocation();
    const navigate = useNavigate();

    // Get the intended route from the state (if available)
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (isAuth) {
            navigate(from, { replace: true });
        }
    }, [isAuth]);

    useEffect(() => {
        const token = getCookie('token');
        const user = getCookie('user');
        const refreshToken = getCookie('refreshToken');
        if (token || user || refreshToken) {
            dispatch({
                type: AUTH_LOGIN_SUCCESS,
                payload: {
                    accessToken: token,
                    user: JSON.parse(user),
                    refreshToken: refreshToken
                }
            });
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        login(dispatch, email, password);
    }

    return (
        <CenteredForm>
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
                htmlType="submit"
                type="primary"
                size="medium"
                onClick={handleLogin}>
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
        </CenteredForm >
    )
}

export default Login;