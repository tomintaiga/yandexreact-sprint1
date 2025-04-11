import { AppDispatch, RootState } from '../app/store';
import { decrementCount } from '../slices/ingredients';
import { removeIngredient } from '../slices/burger-ingredients';
import { TBurgerIngredient } from '../../declarations/burger';

export const removeIngredientFromBurger =
  (ingredient: TBurgerIngredient) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    // Уменьшаем счетчик
    dispatch(decrementCount(ingredient._id));

    // Удаляем ингридиент из конструктора
    dispatch(removeIngredient(ingredient));
  };
