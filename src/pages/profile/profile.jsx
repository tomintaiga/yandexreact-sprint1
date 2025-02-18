import curStyle from './profile.module.css';
import { PasswordInput, Input, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

const Profile = () => {
    return (
        <div className={curStyle.top_div}>
            <div className={curStyle.links_div}>
                <NavLink to="/profile" className={`text text_type_main-medium ${curStyle.link_active}`}>Профиль</NavLink>
                <NavLink to="/profile/orders" className={`text text_type_main-medium text_color_inactive ${curStyle.link_inactive}`}>История заказов</NavLink>
                <NavLink to="/logout" className={`text text_type_main-medium text_color_inactive ${curStyle.link_inactive}`}>Выход</NavLink>
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