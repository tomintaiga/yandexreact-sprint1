import curStyle from './profile.module.css';
import {
  PasswordInput,
  Input,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  PROFILE_SET_NAME,
  PROFILE_SET_EMAIL,
  PROFILE_SET_PASSWORD,
} from '../../services/actions/profile';
import React from 'react';
import { useGetProfileQuery } from '../../api/profile';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetProfileQuery();

  if (!data) {
    return (
      <p
        className={`text text_type_main-default text_color_inactive ${curStyle.links_bottom_p}`}
      >
        Пользователь не найден
      </p>
    );
  }

  if (isLoading) {
    return (
      <p
        className={`text text_type_main-default text_color_inactive ${curStyle.links_bottom_p}`}
      >
        Загрузка...
      </p>
    );
  }

  if (error) {
    return (
      <p
        className={`text text_type_main-default text_color_inactive ${curStyle.links_bottom_p}`}
      >
        Ошибка загрузки данных
      </p>
    );
  }

  return (
    <div className={curStyle.top_div}>
      <div className={curStyle.links_div}>
        <NavLink
          to="/profile"
          className={`text text_type_main-medium ${curStyle.link_active}`}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`text text_type_main-medium text_color_inactive ${curStyle.link_inactive}`}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/logout"
          className={`text text_type_main-medium text_color_inactive ${curStyle.link_inactive}`}
        >
          Выход
        </NavLink>
        <p
          className={`text text_type_main-default text_color_inactive ${curStyle.links_bottom_p}`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={curStyle.child_div}>
        <Input
          type="text"
          value={data.user.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: PROFILE_SET_NAME, payload: e.target.value })
          }
          placeholder="Имя"
          icon="EditIcon"
        />
        <EmailInput
          name="email"
          size="default"
          placeholder="Логин"
          value={data.user.email}
          onChange={(e) =>
            dispatch({ type: PROFILE_SET_EMAIL, payload: e.target.value })
          }
        />
        <PasswordInput
          name="password"
          size="default"
          value=""
          icon="EditIcon"
          onChange={(e) =>
            dispatch({ type: PROFILE_SET_PASSWORD, payload: e.target.value })
          }
        />
      </form>
    </div>
  );
};

export default Profile;
