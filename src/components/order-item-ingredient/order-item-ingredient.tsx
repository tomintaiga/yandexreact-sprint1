import React from 'react';
import curStyle from './order-item-ingredient.module.css';

export interface IOrderItemIngredient {
  image: string;
  caption?: string;
}

const OrderItemIngredient: React.FC<IOrderItemIngredient> = ({
  image,
  caption,
}) => {
  return (
    <div className={`${curStyle.item} ${caption ? curStyle.withCaption : ''}`}>
      <img
        src={image}
        alt={caption}
        className={`${curStyle.img} ${caption ? curStyle.imgWithCaption : ''}`}
      />
      {caption && (
        <p className={`${curStyle.caption} text text_type_main-default`}>
          {caption}
        </p>
      )}
    </div>
  );
};

export default OrderItemIngredient;
