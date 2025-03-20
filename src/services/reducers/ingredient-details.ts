import { TBurgerIngredient } from '../../../declarations/burger';
import {
  SHOW_INGREDIENT_DETAILS,
  HIDE_INGREDIENT_DETAILS,
  TIngredientDetailsActions,
} from '../actions/ingredient-details';

type TIinitialState = {
  showDetail: boolean;
  ingredient: TBurgerIngredient | null;
};

const initialState = {
  showDetail: false,
  ingredient: null,
};

export const ingredientDetailReducer = (state:TIinitialState = initialState, action:TIngredientDetailsActions) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAILS: {
      return {
        ...state,
        showDetail: true,
        ingredient: action.payload,
      };
    }
    case HIDE_INGREDIENT_DETAILS: {
      return {
        ...state,
        showDetail: false,
        ingredient: null,
      };
    }
    default:
      return state;
  }
};
