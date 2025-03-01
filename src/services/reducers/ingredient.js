import {
  GET_INGEDIENT_FAILED,
  GET_INGEDIENT_SUCCESS,
  GET_INGEDIENT_REQUEST,
} from '../actions/ingredient';
import {
  INCREMENT_INGREDIENT_COUNTER,
  DECREMENT_INGREDIENT_COUNTER,
} from '../actions/ingredient';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsError: false,
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGEDIENT_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsError: false,
      };
    }
    case GET_INGEDIENT_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsRequest: false,
        ingredientsError: false,
      };
    }
    case GET_INGEDIENT_FAILED: {
      // Write error to console
      console.log(GET_INGEDIENT_FAILED, action.payload);
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsError: true,
      };
    }
    case INCREMENT_INGREDIENT_COUNTER: {
      return {
        ...state,
        ingredients: state.ingredients.map((item) => {
          if (item._id === action.payload) {
            return {
              ...item,
              count: (item.count += 1),
            };
          }
          return item;
        }),
      };
    }
    case DECREMENT_INGREDIENT_COUNTER: {
      return {
        ...state,
        ingredients: state.ingredients.map((item) => {
          if (item._id === action.payload) {
            if (item.count == 0) {
              return item;
            }

            return {
              ...item,
              count: (item.count -= 1),
            };
          }

          return item;
        }),
      };
    }
    default: {
      return state;
    }
  }
};
