import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TBurgerIngredient } from '../../declarations/burger';
import { ingredientsApi } from '../api/ingredients';

interface IBurgerIngredientsState {
    ingredients: Array<TBurgerIngredient>;
    counters: Record<string, number>;
}

const initialState: IBurgerIngredientsState = {
    ingredients: Array<TBurgerIngredient>(),
    counters: {}
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        incrementCount(state, action: PayloadAction<string>) {
            const id = action.payload;
            state.counters[id] = (state.counters[id] || 0) + 1;
        },
        decrementCount(state, action: PayloadAction<string>) {
            const id = action.payload;
            if(state.counters[id] && state.counters[id]> 0 ) {
                state.counters[id] -=1;
            }
        }
    },
    // Используется для заполнения слайса после завершения запроса к API
    extraReducers: (builder) => {
        builder.addMatcher(
            ingredientsApi.endpoints.getIngredients.matchFulfilled,
            (state, action) => {
                state.counters = {};
                state.ingredients = action.payload
            }
        )
    }
});

export const {incrementCount, decrementCount} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
