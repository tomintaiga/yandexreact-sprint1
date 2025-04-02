import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TBurgerIngredient } from "../../declarations/burger";

interface IIngredientDetailsState {
  showDetail: boolean;
  ingredient: TBurgerIngredient | null;
}

const initialState: IIngredientDetailsState = {
  showDetail: false,
  ingredient: null,
};

export const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    showIngredientDetails(state, action: PayloadAction<TBurgerIngredient>) {
      state.showDetail = true;
      state.ingredient = action.payload;
    },
    hideIngredientDetails(state) {
      state.showDetail = false;
      state.ingredient = null;
    },
  },
});

export const { showIngredientDetails, hideIngredientDetails } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;