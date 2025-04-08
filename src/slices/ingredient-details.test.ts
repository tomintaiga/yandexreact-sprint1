import { describe, expect, it } from '@jest/globals';
import { ingredientDetailsSlice, showIngredientDetails, hideIngredientDetails } from './ingredient-details';
import { TBurgerIngredient } from '../../declarations/burger';

describe('ingredientDetailsSlice reducers', () => {
    const initialState = {
        showDetail: false,
        ingredient: null,
    };

    const mockIngredient: TBurgerIngredient = {
        _id: '1',
        name: 'Ingredient 1',
        type: 'bun',
        proteins: 10,
        fat: 20,
        carbohydrates: 30,
        calories: 200,
        price: 50,
        image: 'image_url',
        image_mobile: 'image_mobile_url',
        image_large: 'image_large_url',
        __v: 0,
        count: 0,
        id: '1',
    };

    it('should set showDetail to true and set the ingredient when showIngredientDetails is called', () => {
        const action = showIngredientDetails(mockIngredient);
        const state = ingredientDetailsSlice.reducer(initialState, action);
        expect(state.showDetail).toBe(true);
        expect(state.ingredient).toEqual(mockIngredient);
    });

    it('should reset showDetail to false and clear the ingredient when hideIngredientDetails is called', () => {
        const action = hideIngredientDetails();
        const state = ingredientDetailsSlice.reducer(
            { showDetail: true, ingredient: mockIngredient },
            action
        );
        expect(state.showDetail).toBe(false);
        expect(state.ingredient).toBeNull();
    });
});