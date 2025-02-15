import curStyle from './profile.module.css';
import { PasswordInput, Input, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

const Profile = () => {
    return (
        <div className={curStyle.top_div}>
            <div className={curStyle.links_div}>
                <p className="text text_type_main-medium">
                    Профиль
                </p>
                <p className="text text_type_main-medium text_color_inactive">
                    История заказов
                </p>
                <p className="text text_type_main-medium text_color_inactive">
                    Выход
                </p>
                <p className={`text text_type_main-default text_color_inactive ${curStyle.links_bottom_p}`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div className={curStyle.child_div}>
                <Input
                    type={'text'}
                    value={''}
                    onChange={() => { }}
                    placeholder={'Имя'}
                    icon={'EditIcon'} />
                <EmailInput
                    name={'email'}
                    size={'default'}
                    placeholder={'Логин'}
                    icon={'EditIcon'}
                    value={''}
                    onChange={() => { }} />
                <PasswordInput
                    name={'password'}
                    size={'default'}
                    value={''}
                    icon={'EditIcon'}
                    onChange={() => { }} />
            </div>
        </div>
    )
};

export default Profile;