import React from 'react';
import { IWsOrder } from '../../../declarations/ws-order';
import { useAppSelector } from '../../app/hooks';
import { TBurgerIngredient } from '../../../declarations/burger';
import curStyle from './single-order.module.css';
import SingleOrderItem from '../single-order-item/single-order-item';
import { formatRelativeDate } from '../../utils/date';
import Price from '../price/price';

type TOrderItem = {
  ingredient: TBurgerIngredient;
  count: number;
  price: number;
};

const calculateOrderItems = (
  ingredients: TBurgerIngredient[],
  orderIngredientIds: string[],
): TOrderItem[] => {
  // Считаем сколько раз каждый ингредиент встречается в заказе
  const ingredientCountMap = orderIngredientIds.reduce(
    (acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Находим ингредиенты по их id и считаем общую цену
  return Object.entries(ingredientCountMap).map(([id, count]) => {
    const ingredient = ingredients.find((item) => item._id === id);
    if (!ingredient) {
      throw new Error(`Ingredient with id ${id} not found`);
    }
    return {
      ingredient,
      count,
      price: ingredient.price * count,
    };
  });
};

const SingleOrder: React.FC<{ order: IWsOrder }> = ({ order }) => {
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const orderIngredients = calculateOrderItems(ingredients, order.ingredients);

  return (
    <div className={curStyle.top_div}>
        <p className={`text text_type_digits-default ${curStyle.number}`}>
          #{order.number}
        </p>
        <p className={`text text_type_main-medium ${curStyle.name}`}>
          {order.name}
        </p>
        <p className={`text text_type_main-default ${curStyle.status}`}>
          {order.status === 'done' ? 'Выполнен' : 'Готовится'}
        </p>
        <p className={`text text_type_main-medium ${curStyle.title}`}>
          Состав:
        </p>
        <div className={curStyle.ingredients_div}>
          {orderIngredients.map((item) => (
            <SingleOrderItem
              key={item.ingredient._id}
              ingredient={item.ingredient}
              count={item.count}
              price={item.price}
            />
          ))}
          </div>
          <div className={curStyle.price_div}>
          <p className={`text text_type_main-default text_color_inactive ${curStyle.date}`}>
            {formatRelativeDate(order.createdAt)}
          </p>

          <Price
            price={orderIngredients.reduce((acc, item) => acc + item.price, 0)}
            isActive={true}
          />
          </div>
    </div>
  )
};

export default SingleOrder;
