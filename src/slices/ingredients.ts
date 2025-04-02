import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TBurgerIngredient } from '../../declarations/burger';
import { BASE_URL } from '../utils/request';

type TIngredientsResponse = {
  success: boolean;
  data: Omit<TBurgerIngredient, 'count'>[]; // Исходные данные без count
};

// Сортировка ингредиентов
const sortIngredients = (
  data: Array<TBurgerIngredient>,
): Array<TBurgerIngredient> => {
  const buns = data.filter((item) => item.type === 'bun');
  const sauces = data.filter((item) => item.type === 'sauce');
  const mains = data.filter((item) => item.type === 'main');
  return [...buns, ...sauces, ...mains];
};

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TBurgerIngredient[], void>({
      query: () => 'ingredients',
      transformResponse: (response: TIngredientsResponse) => {
        // Добавляем count: 0 к каждому ингредиенту
        return sortIngredients(
          response.data.map((ingredient) => ({
            ...ingredient,
            count: 0,
          })),
        );
      },
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
