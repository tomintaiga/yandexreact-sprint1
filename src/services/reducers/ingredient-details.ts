import { TBurgerIngredient } from '../../../declarations/burger';
import {
  SHOW_INGREDIENT_DETAILS,
  HIDE_INGREDIENT_DETAILS,
  TIngredientDetailsActions,
} from '../actions/ingredient-details';

export type TIngredientDetailsState = {
  showDetail: boolean;
  ingredient: TBurgerIngredient | null;
};

const initialState:TIngredientDetailsState = {
  showDetail: false,
  ingredient: null,
};

export const ingredientDetailReducer = (state:TIngredientDetailsState = initialState, action:TIngredientDetailsActions) => {
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
