import { combineReducers } from 'redux';
import { ingredientReducer } from "./ingredient";
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailReducer } from './ingredient-details';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    ingredient: ingredientReducer,
    burger: burgerConstructorReducer,
    ingredientDetail: ingredientDetailReducer,
    order: orderReducer,
});