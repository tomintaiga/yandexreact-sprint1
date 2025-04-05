import React from 'react';
import curStyle from './profile.module.css';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const Profile: React.FC = () => {
  const location = useLocation();
  const isOrdersRoute = location.pathname.startsWith('/profile/orders');

  return (
    <div className={curStyle.top_div}>
      <div className={curStyle.links_div}>
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            `text text_type_main-medium ${isActive ? curStyle.link_active : curStyle.link_inactive}`
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            `text text_type_main-medium ${isActive ? curStyle.link_active : curStyle.link_inactive}`
          }
        >
          История заказов
        </NavLink>
        <NavLink
          to="/logout"
          className={`text text_type_main-medium ${curStyle.link_inactive}`}
        >
          Выход
        </NavLink>
        <p
          className={`text text_type_main-default text_color_inactive ${curStyle.links_bottom_p}`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={`${curStyle.child_div} ${isOrdersRoute ? curStyle.child_div_wide : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
