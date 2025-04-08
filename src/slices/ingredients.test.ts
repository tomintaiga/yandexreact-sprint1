import { describe, expect, it } from '@jest/globals';
import {
  ingredientsSlice,
  incrementCount,
  decrementCount,
  clearCount,
} from './ingredients';
import { TBurgerIngredient } from '../../declarations/burger';

describe('ingredientsSlice reducers', () => {
  const initialState = {
    ingredients: [
      { _id: '1', name: 'Ingredient 1', count: 0 } as TBurgerIngredient,
      { _id: '2', name: 'Ingredient 2', count: 2 } as TBurgerIngredient,
    ],
  };

  it('should handle initial state', () => {
    const action = { type: undefined };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should increment count for the given ingredient ID', () => {
    const action = incrementCount('1');
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.ingredients.find((item) => item._id === '1')?.count).toBe(1);
  });

  it('should decrement count for the given ingredient ID', () => {
    const action = decrementCount('2');
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.ingredients.find((item) => item._id === '2')?.count).toBe(1);
  });

  it('should not decrement count below 0', () => {
    const action = decrementCount('1');
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.ingredients.find((item) => item._id === '1')?.count).toBe(0);
  });

  it('should clear count for all ingredients', () => {
    const action = clearCount();
    const state = ingredientsSlice.reducer(initialState, action);
    state.ingredients.forEach((item) => {
      expect(item.count).toBe(0);
    });
  });
});
