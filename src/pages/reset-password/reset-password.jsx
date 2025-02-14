import curStyle from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ResetPassword = () => {
    return (
        <div className={curStyle.top_div}>
            <div className={curStyle.child_div}>
                <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                <div className={curStyle.input}>
                    <PasswordInput name={'password'} size={'default'} value={''} onChange={() => { }} />
                </div>
                <div className={curStyle.input}>
                    <Input type={'text'} placeholder={'Введите код из письма'} />
                </div>
                <div className={curStyle.button}>
                    <Button type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
                <p className={`text text_type_main-default text_color_inactive ${curStyle.login_p}`}>
                    Вспомнили пароль?
                    <a href="/login" >Войти</a>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;