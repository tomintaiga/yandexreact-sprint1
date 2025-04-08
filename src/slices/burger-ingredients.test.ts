import { describe, expect, it } from '@jest/globals';
import {
  burgerIngredientsSlice,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearIngredients,
} from './burger-ingredients';
import { TBurgerIngredient } from '../../declarations/burger';

describe('burgerIngredientsSlice reducers', () => {
  const initialState = {
    ingredients: [],
    totalPrice: 0,
  };

  const bun: TBurgerIngredient = {
    id: '1',
    _id: 'bun1',
    name: 'Bun',
    type: 'bun',
    price: 50,
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 200,
    image: 'bun_image_url',
    image_mobile: 'bun_image_mobile_url',
    image_large: 'bun_image_large_url',
    __v: 0,
    count: 0,
  };

  const ingredient: TBurgerIngredient = {
    id: '2',
    _id: 'ingredient1',
    name: 'Ingredient',
    type: 'main',
    price: 30,
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 200,
    image: 'bun_image_url',
    image_mobile: 'bun_image_mobile_url',
    image_large: 'bun_image_large_url',
    __v: 0,
    count: 0,
  };

  it('should handle initial state', () => {
    const action = { type: undefined };
    const state = burgerIngredientsSlice.reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should add a bun and update totalPrice', () => {
    const action = addIngredient(bun);
    const state = burgerIngredientsSlice.reducer(initialState, action);
    expect(state.ingredients.length).toBe(2);
    expect(state.totalPrice).toBe(100);
  });

  it('should add a non-bun ingredient and update totalPrice', () => {
    const action = addIngredient(ingredient);
    const state = burgerIngredientsSlice.reducer(
      { ...initialState, ingredients: [bun, bun], totalPrice: 100 },
      action,
    );
    expect(state.ingredients.length).toBe(3);
    expect(state.totalPrice).toBe(130);
  });

  it('should remove a non-bun ingredient and update totalPrice', () => {
    const action = removeIngredient(ingredient);
    const state = burgerIngredientsSlice.reducer(
      { ...initialState, ingredients: [bun, bun, ingredient], totalPrice: 130 },
      action,
    );
    expect(state.ingredients.length).toBe(2);
    expect(state.totalPrice).toBe(100);
  });

  it('should not remove a bun', () => {
    const action = removeIngredient(bun);
    const state = burgerIngredientsSlice.reducer(
      { ...initialState, ingredients: [bun, bun], totalPrice: 100 },
      action,
    );
    expect(state.ingredients.length).toBe(2);
    expect(state.totalPrice).toBe(100);
  });

  it('should move ingredients within the list', () => {
    const action = moveIngredient({ dragId: '2', dropId: '1' });
    const state = burgerIngredientsSlice.reducer(
      { ...initialState, ingredients: [ingredient, bun, bun] },
      action,
    );
    expect(state.ingredients[0]).toBe(bun);
    expect(state.ingredients[1]).toBe(ingredient);
  });

  it('should clear all ingredients and reset totalPrice', () => {
    const action = clearIngredients();
    const state = burgerIngredientsSlice.reducer(
      { ...initialState, ingredients: [bun, bun, ingredient], totalPrice: 130 },
      action,
    );
    expect(state.ingredients.length).toBe(0);
    expect(state.totalPrice).toBe(0);
  });
});
