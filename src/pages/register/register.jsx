import React from "react";
import curStyle from "./register.module.css";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Centereded from "../../components/centered/centered";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <Centereded>
            <p className="text text_type_main-default">Регистрация</p>
            <Input type={'text'}
                placeholder={'Имя'}
                name={'login'}
                value={''}
                onChange={e => console.log(e.target.value)} />
            <EmailInput
                onChange={e => console.log(e.target.value)}
                value={''}
                name={'email'} />
            <PasswordInput
                onChange={e => console.log(e.target.value)}
                value={''}
                name={'password'}
                extraClass="mb-2"
            />
            <Button htmlType="button" type="primary" size="medium">
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