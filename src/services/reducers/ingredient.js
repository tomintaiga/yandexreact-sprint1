import { GET_INGEDIENT_FAILED, GET_INGEDIENT_SUCCESS, GET_INGEDIENT_REQUEST } from "../actions/ingredient";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,
};

export const ingredientReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_INGEDIENT_REQUEST:{
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsError: false,
            }
        }
        case GET_INGEDIENT_SUCCESS: {
            return {
                ...state,
                ingredients: action.value,
                ingredientsRequest: false,
                ingredientsError: false,
            }
        }
        case GET_INGEDIENT_FAILED: {
            // Write error to console
            console.log(action.value);
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsError: true,
            }
        }
        default: {
            return state;
        }
    }
}