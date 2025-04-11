import React from 'react';
import curStyle from './single-order-item.module.css';
import { TBurgerIngredient } from '../../../declarations/burger';
import Price from '../price/price';
import OrderItemIngredient from '../order-item-ingredient/order-item-ingredient';

interface ISingleOrderItem {
  ingredient: TBurgerIngredient;
  count: number;
}

const SingleOrderItem: React.FC<ISingleOrderItem> = ({ ingredient, count }) => {
  return (
    <div className={curStyle.ingredient_row}>
      <div className={curStyle.ingredient_info}>
        <OrderItemIngredient image={ingredient.image_mobile} />
        <p className={`text text_type_main-default ${curStyle.name}`}>
          {ingredient.name}
        </p>
      </div>
      <Price price={`${count}x${ingredient.price}`} isActive={true} />
    </div>
  );
};

export default SingleOrderItem;