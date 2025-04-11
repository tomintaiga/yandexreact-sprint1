import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TBurgerIngredient } from '../../declarations/burger';
import { ingredientsApi } from '../api/ingredients';

interface IBurgerIngredientsState {
    ingredients: Array<TBurgerIngredient>;
}

const initialState: IBurgerIngredientsState = {
    ingredients: Array<TBurgerIngredient>(),
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        incrementCount(state, action: PayloadAction<string>) {
            const id = action.payload;
            state.ingredients.forEach((item) => {
                if (item._id === id) {
                    item.count = (item.count || 0) + 1;
                }
            });
        },
        decrementCount(state, action: PayloadAction<string>) {
            const id = action.payload;
            state.ingredients.forEach((item) => {
                if (item._id === id) {
                    item.count = (item.count || 0) - 1;

                    if (item.count < 0) {
                        item.count = 0;
                    }
                }
            });
        },
        clearCount(state) {
            state.ingredients.forEach((item) => {
                item.count = 0;
            });
        }
    },
    // Используется для заполнения слайса после завершения запроса к API
    extraReducers: (builder) => {
        builder.addMatcher(
            ingredientsApi.endpoints.getIngredients.matchFulfilled,
            (state, action) => {
                state.ingredients = action.payload
            }
        )
    }
});

export const {incrementCount, decrementCount, clearCount} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
