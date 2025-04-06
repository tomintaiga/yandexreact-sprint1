import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TBurgerIngredient } from '../../declarations/burger';

interface IBurgerIngredientsState {
  ingredients: Array<TBurgerIngredient>;
  totalPrice: number;
}

const initialState: IBurgerIngredientsState = {
  ingredients: [],
  totalPrice: 0,
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TBurgerIngredient>) {
      const cur = action.payload;

      // Считаем сколько булочек у нас есть
      const count = state.ingredients.filter(
        (item) => item.type === 'bun',
      ).length;

      if (cur.type === 'bun') {
        // Не больше двух булок в бургере
        if (count === 0) {
          // Булочек в конструкторе нет - добавляем сразу две
          state.ingredients = [cur, ...state.ingredients, cur];
          state.totalPrice += cur.price * 2;
        } else {
          // Заменяем старую булку на новую
          let price = 0;
          const ingredients = state.ingredients.map((item) => {
            if (item.type === 'bun') {
              price = item.price;
              return cur;
            }
            return item;
          });

          state.totalPrice += cur.price * 2 - price;
          state.ingredients = ingredients;
        }
      } else {
        // Обрабатываем не булочки
        if (count == 0) {
          state.ingredients = [cur, ...state.ingredients];
          state.totalPrice += cur.price;
        } else {
          state.ingredients = [
            state.ingredients[0],
            cur,
            ...state.ingredients.slice(1),
          ];
          state.totalPrice += cur.price;
        }
      }
    },
    removeIngredient(state, action: PayloadAction<TBurgerIngredient>) {
      const cur = action.payload;
      // Не даем удалять булочки
      if (cur.type === 'bun') {
        return;
      }

      state.ingredients = state.ingredients.filter((item) => item.id != cur.id);
      state.totalPrice -= cur.price;
    },
    moveIngredient(
      state,
      action: PayloadAction<{ dragId: string; dropId: string }>,
    ) {
      const { dragId, dropId } = action.payload;
      const dragIndex = state.ingredients.findIndex(
        (item) => item.id === dragId,
      );
      const dropIndex = state.ingredients.findIndex(
        (item) => item.id === dropId,
      );

      state.ingredients = state.ingredients.map((item, index) => {
        if (index === dragIndex) {
          return state.ingredients[dropIndex];
        } else if (index === dropIndex) {
          return state.ingredients[dragIndex];
        }
        return item;
      });
    },
    clearIngredients(state) {
      state.ingredients = [];
      state.totalPrice = 0;
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient, clearIngredients } =
  burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
