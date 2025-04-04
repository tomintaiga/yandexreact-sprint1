import curStyle from './profile.module.css';
import {
  PasswordInput,
  Input,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import React from 'react';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../api/profile';
import { TUser } from '../../../declarations/user';

const Profile: React.FC = () => {
  const { data, isLoading, error } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating, error: updateError }] =
    useUpdateProfileMutation();

  const handleOrder = async (user: TUser) => {
    try {
      const response = await updateProfile(user).unwrap();
      console.log('User updated:', response);
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  if (!data) {
    return (
      <p
        className={`text text_type_main-default text_color_inactive ${curStyle.links_bottom_p}`}
      >
        Пользователь не найден
      </p>
    );
  }

  if (isLoading || isUpdating) {
    return (
      <p
        className={`text text_type_main-default text_color_inactive ${curStyle.links_bottom_p}`}
      >
        Загрузка...
      </p>
    );
  }

  if (error || updateError) {
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
            handleOrder({ ...data.user, name: e.target.value })
          }
          placeholder="Имя"
          icon="EditIcon"
        />
        <EmailInput
          name="email"
          size="default"
          placeholder="Логин"
          value={data.user.email}
          onChange={(e) => handleOrder({ ...data.user, email: e.target.value })}
        />
        <PasswordInput
          name="password"
          size="default"
          value=""
          icon="EditIcon"
          onChange={(e) =>
            handleOrder({ ...data.user, password: e.target.value })
          }
        />
      </form>
    </div>
  );
};

export default Profile;
