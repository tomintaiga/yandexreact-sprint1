import { AppDispatch, RootState } from '../app/store';
import { incrementCount, decrementCount } from '../slices/ingredients';
import { addIngredient } from '../slices/burger-ingredients';
import { TBurgerIngredient } from '../../declarations/burger';
import { v4 as uuid4 } from 'uuid';

export const addIngredientToBurger =
  (ingredient: TBurgerIngredient) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    if (ingredient.type === 'bun') {
      // Считаем сколько булочек у нас есть
      const count = getState().burgerIngredients.ingredients.filter(
        (item) => item.type === 'bun',
      ).length;

      if (count === 0) {
        // Булочек в конструкторе нет - добавляем сразу две
        dispatch(incrementCount(ingredient._id));
        dispatch(incrementCount(ingredient._id));
      } else {
        // Если у нас уже есть булочки мы заменяем и надо сбросить счетчик у старой
        getState().burgerIngredients.ingredients.forEach((item) => {
          if (item.type === 'bun') {
            dispatch(decrementCount(item._id));
          }
        });

        // Увеличиваем счетчик у новой булки
        dispatch(incrementCount(ingredient._id));
        dispatch(incrementCount(ingredient._id));
      }

      // Добавляем булку в конструктор
      dispatch(addIngredient({...ingredient, id: uuid4() }));
    } else {
      // Добавляем ингридиент в конструктор
      dispatch(addIngredient({...ingredient, id: uuid4() }));

      // Увеличиваем счетчик
      dispatch(incrementCount(ingredient._id));
    }
  };
