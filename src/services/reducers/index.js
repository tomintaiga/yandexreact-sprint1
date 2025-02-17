import { combineReducers } from 'redux';
import { ingredientReducer } from "./ingredient";
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailReducer } from './ingredient-details';
import { orderReducer } from './order';
import { forgotPasswordReducer } from './forgot-password';
import { resetPasswordReducer } from './reset-password';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
    ingredient: ingredientReducer,
    burger: burgerConstructorReducer,
    ingredientDetail: ingredientDetailReducer,
    order: orderReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    auth: authReducer,
});