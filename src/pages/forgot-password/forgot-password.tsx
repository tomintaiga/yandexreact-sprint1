import curStyle from './forgot-password.module.css';
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { forgotPassword } from '../../services/actions/forgot-password';
import { Link } from 'react-router-dom';
import { TStore } from '../../declarations/store';

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const isResetRequest = useSelector(
    (store: TStore) => store.forgotPassword.forgotPasswordLoading,
  );
  const isResetError = useSelector(
    (store: TStore) => store.forgotPassword.forgotPasswordLoadingError,
  );
  const isResetSuccess = useSelector(
    (store: TStore) => store.forgotPassword.forgotPasswordSuccess,
  );

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    forgotPassword(dispatch, email);
  };

  return (
    <div className={curStyle.top_div}>
      <form className={curStyle.child_div} onSubmit={handleForgotPassword}>
        <p className="text text_type_main-default">Восстановление пароля</p>
        {isResetError && (
          <p className="text text_type_main-default text_color_inactive">
            Ошибка сброса пароля
          </p>
        )}
        {isResetRequest && (
          <p className="text text_type_main-default text_color_inactive">
            Загрузка...
          </p>
        )}
        {isResetSuccess && (
          <p className="text text_type_main-default text_color_inactive">
            Пиьмо сброса пароля отправлено
          </p>
        )}
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={'email'}
          placeholder={'E-mail'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
        <p
          className={`text text_type_main-default text_color_inactive ${curStyle.login_p}`}
        >
          Вспомнили пароль?&nbsp;
          <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
