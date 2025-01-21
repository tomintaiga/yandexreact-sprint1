import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BntIcon from "../btn-icon/btn-icon";

import headerStyle from "./app-header.module.css";

const AppHeader = () => {
    return (
        <div className={headerStyle.header_div}>
            <div className={headerStyle.inner_flex}>
                <BntIcon IconComponent={BurgerIcon} text="Конструктор" />
                <BntIcon IconComponent={ListIcon} text="Лента заказов" />
            </div>
            <Logo/>
            <BntIcon IconComponent={ProfileIcon} text="Личный кабинет" />
        </div>
    );
};

export default AppHeader;