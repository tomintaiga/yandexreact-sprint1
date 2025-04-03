import curStyles from './login.module.css';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { CenteredForm } from '../../components/centered/centered';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCookie, setCookie } from '../../utils/cookie';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCredentials } from '../../slices/auth';
import { TUser } from '../../../declarations/user';
import { useLoginMutation } from '../../api/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  // const isAuth = useSelector((store: TStore) => store.auth.isAuth);
  const isAuth = useAppSelector((store) => store.auth.isAuth);
  const location = useLocation();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  // Get the intended route from the state (if available)
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
    }
  }, [isAuth, navigate, from]);

  useEffect(() => {
    const token = getCookie('token');
    const user = getCookie('user');
    const refreshToken = getCookie('refreshToken');
    if (token && user && refreshToken) {
      const userItem = JSON.parse(user) as TUser;
      if (userItem) {
        dispatch(setCredentials({ user: userItem, token, refreshToken }));
      }
    }
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      try {
        const response = await login({ email, password }).unwrap();
        setCookie('token', response.accessToken);
        setCookie('refreshToken', response.refreshToken);
        setCookie('user', JSON.stringify(response.user));
      } catch (error) {
        console.error('Login failed:', error);
      }
    })();
  };

  return (
    <CenteredForm onSubmit={handleSubmit}>
      <p className="text text_type_main-default">Вход</p>
      {error && (
        <p className="text text_type_main-default text_color_inactive">
          Ошибка авторизации
        </p>
      )}
      {isLoading && (
        <p className="text text_type_main-default text_color_inactive">
          Загрузка...
        </p>
      )}
      <EmailInput
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={'email'}
        placeholder={'E-mail'}
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={password}
        placeholder={'Пароль'}
        extraClass="mb-2"
      />
      <Button htmlType="submit" type="primary" size="medium">
        Войти
      </Button>
      <p
        className={`text text_type_main-default text_color_inactive ${curStyles.login_p}`}
      >
        Забыли пароль?&nbsp;
        <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
      <p
        className={`text text_type_main-default text_color_inactive ${curStyles.restore_p}`}
      >
        Вы новый пользователь?&nbsp;
        <Link to="/register">Зарегистрироваться</Link>
      </p>
    </CenteredForm>
  );
};

export default Login;
