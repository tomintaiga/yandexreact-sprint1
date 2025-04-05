import React, { useCallback } from 'react';
import OrderItemIngredient from '../order-item-ingredient/order-item-ingredient';
import { useAppSelector } from '../../app/hooks';
import curStyle from './order-item-ingredient-list.module.css';
import { TBurgerIngredient } from '../../../declarations/burger';

const OrderItemIngredientList: React.FC<{ ingredients: Array<string> }> = ({
  ingredients,
}) => {
  const orderItems = useAppSelector((store) => store.ingredients.ingredients);

  const filterItems = useCallback(
    (ingredients: Array<string>) => {
      return ingredients
        .map((id) => orderItems.find((item) => item._id === id))
        .filter(Boolean) as TBurgerIngredient[];
    },
    [orderItems],
  );

  const filteredItems = filterItems(ingredients);
  const maxSize = 6;
  const overflow = filteredItems.length - maxSize;
  const showOverflow = overflow > 0;
  const itemsToShow = showOverflow
    ? filteredItems.slice(0, maxSize - 1)
    : filteredItems.slice(0, maxSize);

  return (
    <div className={curStyle.order_list}>
      {showOverflow && (
        <div className={curStyle.overflow_item}>
          <OrderItemIngredient
            image={filteredItems[maxSize - 1].image_mobile}
            caption={`+${overflow}`}
          />
        </div>
      )}
      {itemsToShow
        .map((item, index) => (
          <div key={`${item._id}-${index}`} className={curStyle.order_item} style={{ zIndex: itemsToShow.length - index }}>
            <OrderItemIngredient image={item.image_mobile} />
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default OrderItemIngredientList;
