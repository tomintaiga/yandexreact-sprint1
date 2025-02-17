import curStyle from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Centereded from "../../components/centered/centered";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { resetPassword } from '../../services/actions/reset-password';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const [pass, setPass] = useState("");
    const [token, setToken] = useState("");

    return (
        <Centereded>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>
            <div className={curStyle.input}>
                <PasswordInput
                    name={'password'}
                    size={'default'}
                    value={pass}
                    onChange={e => setPass(e.target.value)} />
            </div>
            <div className={curStyle.input}>
                <Input
                    type={'text'}
                    name={'code'}
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    placeholder={'Введите код из письма'} />
            </div>
            <div className={curStyle.button}>
                <Button
                    type="primary"
                    size="medium"
                    htmlType={'button'}
                    onClick={() => resetPassword(dispatch, pass, token)} >
                    Сохранить
                </Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${curStyle.login_p}`}>
                Вспомнили пароль?
                <Link to="/login">Войти</Link>
            </p>
        </Centereded>
    );
};

export default ResetPassword;