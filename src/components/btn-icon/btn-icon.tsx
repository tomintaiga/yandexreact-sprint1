import React from 'react';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import btnStyle from './btn-icon.module.css';

interface IBntIcon {
  IconComponent: React.FC<TIconProps>;
  text: string;
  onClick?: () => void;
}

const BntIcon: React.FC<IBntIcon> = ({ IconComponent, text, onClick }) => {
  const [isActive, setIsActive] = React.useState<'primary' | 'secondary'>('secondary');

  return (
    <div
      onClick={onClick ? onClick : undefined}
      onMouseEnter={() => setIsActive('primary')}
      onMouseLeave={() => setIsActive('secondary')}
      className={btnStyle.btn_div}
    >
      <IconComponent type={isActive} className={btnStyle.btn_icon} />
      <p className={'text text_type_main-default ' + btnStyle.btn_caption}>
        {text}
      </p>
    </div>
  );
};

export default BntIcon;