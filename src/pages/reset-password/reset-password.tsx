import curStyle from './reset-password.module.css';
import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { CenteredForm } from '../../components/centered/centered';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useResetPasswordMutation } from '../../api/auth';

const ResetPassword: React.FC = () => {
  const [pass, setPass] = useState('');
  const [token, setToken] = useState('');
  const [resetPassword, {isLoading, error}] = useResetPasswordMutation();
  const navigate = useNavigate();

  const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword({ password: pass, token }).unwrap()
    .then(data => {
      if (data.success) {
        navigate('/login');
      }
    });
  };

  return (
    <CenteredForm onSubmit={handleResetPassword}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      {error && (
        <p
          className={`text text_type_main-default text_color_inactive ${curStyle.register_error}`}
        >
          Ошибка сброса пароля
        </p>
      )}
      {isLoading && (
        <p
          className={`text text_type_main-default text_color_inactive ${curStyle.register_error}`}
        >
          Сброс пароля...
        </p>
      )}
      <div className={curStyle.input}>
        <PasswordInput
          name='password'
          size='default'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <div className={curStyle.input}>
        <Input
          type='text'
          name='code'
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder={'Введите код из письма'}
        />
      </div>
      <div className={curStyle.button}>
        <Button type="primary" size="medium" htmlType="submit">
          Обновить пароль
        </Button>
      </div>
      <p
        className={`text text_type_main-default text_color_inactive ${curStyle.login_p}`}
      >
        Вспомнили пароль?
        <Link to="/login">Войти</Link>
      </p>
    </CenteredForm>
  );
};

export default ResetPassword;
