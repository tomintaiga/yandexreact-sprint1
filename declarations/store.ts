import { TBurgerConstructorState } from '../services/reducers/burger-constructor';
import { TAuthState } from '../services/reducers/auth';
import { TIgredientsState } from '../services/reducers/ingredient';
import { TIngredientDetailsState } from '../services/reducers/ingredient-details';
import { TOrderState } from '../services/reducers/order';
import { TForgotPasswordState } from '../services/reducers/forgot-password';
import { TResetPasswordState } from '../services/reducers/reset-password';
import { TProfileState } from '../services/reducers/profile';

export type TStore = {
  burger: TBurgerConstructorState;
  auth: TAuthState;
  ingredient: TIgredientsState;
  ingredientDetail: TIngredientDetailsState;
  order: TOrderState;
  forgotPassword: TForgotPasswordState;
  resetPassword: TResetPasswordState;
  profile: TProfileState;
};
