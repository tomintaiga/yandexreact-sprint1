import curStyle from './register.module.css';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { CenteredForm } from '../../components/centered/centered';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useRegisterMutation } from '../../api/auth';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [register, { isLoading, error }] = useRegisterMutation();
  const isAuth = useAppSelector((store) => store.auth.isAuth);

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register({ email, password, name })
  };

  return (
    <CenteredForm onSubmit={handleRegister}>
      <p className="text text_type_main-default">Регистрация</p>
      {error && (
        <p
          className={`text text_type_main-default text_color_inactive ${curStyle.register_error}`}
        >
          Ошибка регистрации
        </p>
      )}
      {isLoading && (
        <p
          className={`text text_type_main-default text_color_inactive ${curStyle.register_error}`}
        >
          Регистрация...
        </p>
      )}
      <Input
        type="text"
        placeholder="Имя"
        name="login"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <EmailInput
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name="email"
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name="password"
        extraClass="mb-2"
      />
      <Button htmlType="submit" type="primary" size="medium">
        Зарегистрироваться
      </Button>
      <p
        className={`text text_type_main-default text_color_inactive ${curStyle.register_p}`}
      >
        Уже зарегестрированы?&nbsp;
        <Link to="/login">Войти</Link>
      </p>
    </CenteredForm>
  );
};

export default Register;
