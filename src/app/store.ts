import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsApi } from '../api/ingredients';
import { authApi } from '../api/auth';
import ingredientDetailsReducer from '../slices/ingredient-details';
import ingredientSliceReducer from '../slices/ingredients';
import burgerIngredientsReducer from '../slices/burger-ingredients';
import authSlice from '../slices/auth';

export const store = configureStore({
  reducer: {
    ['ingredientsApi']: ingredientsApi.reducer,
    ['authApi']: authApi.reducer,
    ingredientDetails: ingredientDetailsReducer,
    ingredients: ingredientSliceReducer,
    burgerIngredients: burgerIngredientsReducer,
    auth: authSlice,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ingredientsApi.middleware,
      authApi.middleware,
    );
  },
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
