import React from 'react';
import curStyle from './profile.module.css';
import { NavLink, Outlet } from 'react-router-dom';

const Profile: React.FC = () => {
  return (
    <div className={curStyle.top_div}>
      <div className={curStyle.links_div}>
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            isActive
              ? `text text_type_main-medium ${curStyle.link_active}`
              : `text text_type_main-medium text_color_inactive ${curStyle.link_inactive}`
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            isActive
              ? `text text_type_main-medium ${curStyle.link_active}`
              : `text text_type_main-medium text_color_inactive ${curStyle.link_inactive}`
          }
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
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
