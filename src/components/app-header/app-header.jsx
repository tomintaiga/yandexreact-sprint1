import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BntIcon from "../btn-icon/btn-icon";
import { Link } from "react-router-dom";

import headerStyle from "./app-header.module.css";

const AppHeader = () => {

    return (
        <div className={headerStyle.header_div}>
            <div className={headerStyle.inner_flex}>
                <Link to="/">
                    <BntIcon IconComponent={BurgerIcon} text="Конструктор" />
                </Link>
                <BntIcon IconComponent={ListIcon} text="Лента заказов" />
            </div>
            <div className={headerStyle.logo_wrapper}>
                <Logo />
            </div>
            <Link to="/profile">
                <BntIcon IconComponent={ProfileIcon} text="Личный кабинет" />
            </Link>
        </div>
    );
};

export default AppHeader;