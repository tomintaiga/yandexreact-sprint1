import React from "react";
import curStyle from "./register.module.css";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Centereded from "../../components/centered/centered";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/actions/auth";
import { useState } from "react";

const Register = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const isRegisterError = useSelector(store => store.auth.isRegisterError);
    const isRegisterRequest = useSelector(store => store.auth.isRegisterRequest);
    const isAuth = useSelector(store => store.auth.isAuth);

    if (isAuth) {
        return <Navigate to="/" />
    }

    return (
        <Centereded>
            <p className="text text_type_main-default">Регистрация</p>
            {isRegisterError && <p className={`text text_type_main-default text_color_inactive ${curStyle.register_error}`}>Ошибка регистрации</p>}
            {isRegisterRequest && <p className={`text text_type_main-default text_color_inactive ${curStyle.register_error}`}>Регистрация...</p>}
            <Input type={'text'}
                placeholder={'Имя'}
                name={'login'}
                value={name}
                onChange={e => setName(e.target.value)} />
            <EmailInput
                onChange={e => setEmail(e.target.value)}
                value={email}
                name={'email'} />
            <PasswordInput
                onChange={e => setPassword(e.target.value)}
                value={password}
                name={'password'}
                extraClass="mb-2"
            />
            <Button
                htmlType="button"
                type="primary"
                size="medium"
                onClick={() => register(dispatch, email, password, name)}
            >
                Зарегистрироваться
            </Button>
            <p className={`text text_type_main-default text_color_inactive ${curStyle.register_p}`}>
                Уже зарегестрированы?&nbsp;
                <Link to="/login">Войти</Link>
            </p>
        </Centereded>
    )
}

export default Register;