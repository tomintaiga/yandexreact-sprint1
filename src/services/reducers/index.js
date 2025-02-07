import { combineReducers } from 'redux';
import { ingredientReducer } from "./ingredient";
import { burgerConstructor } from './burger-constructor';

export const rootReducer = combineReducers({
    ingredient: ingredientReducer,
    burger: burgerConstructor,
});