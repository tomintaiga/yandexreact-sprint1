import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import curStyle from './price.module.css';

interface IPrice {
  price: number | string;
  isActive: boolean;
}

const Price: React.FC<IPrice> = ({ price, isActive }) => {
  const activeStyle = isActive ? '' : 'text_color_inactive';
  return (
    <p
      className={`text text_type_digits-default ${activeStyle} ${curStyle.currency_p}`}
    >
      {price}
      <CurrencyIcon type="primary" className={curStyle.currency_icon} />
    </p>
  );
};

export default Price;
