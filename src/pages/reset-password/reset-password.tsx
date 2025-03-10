import curStyle from './reset-password.module.css';
import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { CenteredForm } from '../../components/centered/centered';
import { useDispatch } from 'react-redux';
import { FormEvent, useState } from 'react';
import { resetPassword } from '../../services/actions/reset-password';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import { TStore } from '../../../declarations/store';

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const [pass, setPass] = useState('');
  const [token, setToken] = useState('');

  const resetPasswordRequest = useSelector(
    (store: TStore) => store.resetPassword.resetPasswordRequest,
  );
  const resetPasswordError = useSelector(
    (store: TStore) => store.resetPassword.resetPasswordError,
  );

  const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword(dispatch, pass, token);
  };

  return (
    <CenteredForm onSubmit={handleResetPassword}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      {resetPasswordError && (
        <p
          className={`text text_type_main-default text_color_inactive ${curStyle.register_error}`}
        >
          Ошибка сброса пароля
        </p>
      )}
      {resetPasswordRequest && (
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
          Сохранить
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
