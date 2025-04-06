import { AppDispatch, RootState } from '../app/store';
import { clearCount } from '../slices/ingredients';
import { clearIngredients } from '../slices/burger-ingredients';


export const clearConstructor =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(clearCount());
    dispatch(clearIngredients());
  };
