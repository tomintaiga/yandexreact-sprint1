import {
  INCREMENT_INGREDIENT_COUNTER,
  DECREMENT_INGREDIENT_COUNTER,
} from './ingredient';
import { v4 as uuid4 } from 'uuid';

export const CONSTRUCTOR_ADD_ITEM = 'CONSTRUCTOR_ADD_ITEM';
export const CONSTRUCTOR_REMOVE_ITEM = 'CONSTRUCTOR_REMOVE_ITEM';

export const CONSTRUCTOR_MOVE_ITEM = 'CONSTRUCTOR_MOVE_ITEM';

export function addIngredient(dispatch, ingredient, ingredients) {
  const addIngredient = (dispatch, ingredient) => {
    dispatch({
      type: CONSTRUCTOR_ADD_ITEM,
      payload: {
        ...ingredient,
        id: uuid4(),
      },
    });
    dispatch({
      type: INCREMENT_INGREDIENT_COUNTER,
      payload: ingredient._id,
    });
  };

  if (ingredient.type === 'bun') {
    // Считаем сколько булочек у нас есть
    const count = ingredients.filter((item) => item.type === 'bun').length;
    if (count === 0) {
      // Булочек в конструкторе нет - добавляем сразу две
      addIngredient(dispatch, ingredient);
      addIngredient(dispatch, ingredient);
      return;
    } else {
      // Если у нас уже есть булочки мы заменяем и надо сбросить счетчик у старой
      ingredients.forEach((item) => {
        if (item.type === 'bun') {
          dispatch({
            type: DECREMENT_INGREDIENT_COUNTER,
            payload: item._id,
          });
        }
      });
      addIngredient(dispatch, ingredient);
    }
  }

  // Два варианта - если нет булочки и есть есть
  // В обоих - это проблемы редьюсера
  addIngredient(dispatch, ingredient);
}

export function removeIngredient(dispatch, ingredient) {
  // Не удаляем булочки
  if (ingredient.type === 'bun') {
    return;
  }

  dispatch({
    type: CONSTRUCTOR_REMOVE_ITEM,
    payload: ingredient,
  });

  dispatch({
    type: DECREMENT_INGREDIENT_COUNTER,
    payload: ingredient._id,
  });
}
