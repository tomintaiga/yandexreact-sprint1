import { SHOW_INGREDIENT_DETAILS, HIDE_INGREDIENT_DETAILS } from "../actions/ingredient-details";

const initialState = {
    showDetail: false,
    ingredient: null,
}

export const ingredientDetailReducer = (state = initialState, action) => {
    switch(action.type) {
        case SHOW_INGREDIENT_DETAILS: {
            return {
                ...state,
                showDetail: true,
                ingredient: action.payload,
            }
        }
        case HIDE_INGREDIENT_DETAILS: {
            return {
                ...state,
                showDetail: false,
                ingredient: null,
            }
        }
        default:
            return state;
    }
}