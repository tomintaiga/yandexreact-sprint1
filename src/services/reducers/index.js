import { combineReducers } from 'redux';
import { ingredientReducer } from "./ingredient";
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailReducer } from './ingredient-details';

export const rootReducer = combineReducers({
    ingredient: ingredientReducer,
    burger: burgerConstructorReducer,
    ingredientDetail: ingredientDetailReducer,
});