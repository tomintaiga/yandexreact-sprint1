import { TBurgerConstructorState } from '../src/services/reducers/burger-constructor';
import { TAuthState } from '../src/services/reducers/auth';
import { TIgredientsState } from '../src/services/reducers/ingredient';
import { TIngredientDetailsState } from '../src/services/reducers/ingredient-details';
import { TOrderState } from '../src/services/reducers/order';
import { TForgotPasswordState } from '../src/services/reducers/forgot-password';
import { TResetPasswordState } from '../src/services/reducers/reset-password';
import { TProfileState } from '../src/services/reducers/profile';

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
