import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BntIcon from '../btn-icon/btn-icon';
import { NavLink } from 'react-router-dom';

import headerStyle from './app-header.module.css';

import React from 'react';

const AppHeader: React.FC = () => {
  return (
    <div className={headerStyle.header_div}>
      <div className={headerStyle.inner_flex}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text text_type_main-medium ${isActive ? 'link_active' : 'link_inactive'}`
          }
        >
          <BntIcon IconComponent={BurgerIcon} text="Конструктор" />
        </NavLink>
        <NavLink
          to="/feed"
          className={({ isActive }) =>
            `text text_type_main-medium ${isActive ? 'link_active' : 'link_inactive'}`
          }
        >
          <BntIcon IconComponent={ListIcon} text="Лента заказов" />
        </NavLink>
      </div>
      <div className={headerStyle.logo_wrapper}>
        <Logo />
      </div>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `text text_type_main-medium ${isActive ? 'link_active' : 'link_inactive'}`
        }
      >
        <BntIcon IconComponent={ProfileIcon} text="Личный кабинет" />
      </NavLink>
    </div>
  );
};

export default AppHeader;
