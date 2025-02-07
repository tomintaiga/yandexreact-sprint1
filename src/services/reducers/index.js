import { combineReducers } from 'redux';
import { ingredientReducer } from "./ingredient";

export const rootReducer = combineReducers({
    ingredient: ingredientReducer,
});