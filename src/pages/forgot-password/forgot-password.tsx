import curStyle from './forgot-password.module.css';
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../api/auth';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    (async () => {
      const response = await forgotPassword(email).unwrap();
      if (response && response.success) {
        setIsResetSuccess(true);
      } else {
        setIsResetSuccess(false);
      }
    })();
  };

  return (
    <div className={curStyle.top_div}>
      <form className={curStyle.child_div} onSubmit={handleForgotPassword}>
        <p className="text text_type_main-default">Восстановление пароля</p>
        {error && (
          <p className="text text_type_main-default text_color_inactive">
            Ошибка сброса пароля
          </p>
        )}
        {isLoading && (
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
