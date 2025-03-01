export const GET_INGEDIENT_REQUEST = 'GET_INGEDIENT_REQUEST';
export const GET_INGEDIENT_SUCCESS = 'GET_INGEDIENT_SUCCESS';
export const GET_INGEDIENT_FAILED = 'GET_INGEDIENT_FAILED';
export const INCREMENT_INGREDIENT_COUNTER = 'INCREMENT_INGREDIENT_COUNTER';
export const DECREMENT_INGREDIENT_COUNTER = 'DECREMENT_INGREDIENT_COUNTER';

import { BASE_URL } from '../../utils/request';

import { fetchWithRefresh } from './auth';

const url = `${BASE_URL}/ingredients`;

// Сортировка ингредиентов
const sortIngredients = (data) => {
  const buns = data.filter((item) => item.type === 'bun');
  const sauces = data.filter((item) => item.type === 'sauce');
  const mains = data.filter((item) => item.type === 'main');
  return [...buns, ...sauces, ...mains];
};

export function loadIngredients(dispatch) {
  // Set loading status
  dispatch({
    type: GET_INGEDIENT_REQUEST,
  });

  // Fetch ingredients
  fetchWithRefresh(dispatch, url, null)
    .then((data) => {
      // Проверка ответа сервера
      if (data.success === true) {
        dispatch({
          type: GET_INGEDIENT_SUCCESS,
          // Тут комбинация победы
          // В начале - сортируем полученные ингредиенты
          // Затем - к каждому добавляем счетчик
          // Счетчик будет использоваться для отображения в компоненте ингредиента
          payload: sortIngredients(data.data).map((item) => ({
            ...item,
            count: 0,
          })),
        });
      } else {
        // Обработка ошибки
        dispatch({
          type: GET_INGEDIENT_FAILED,
          payload: data.message,
        });
      }
    })
    .catch((err) => {
      // Обработка ошибки
      dispatch({
        type: GET_INGEDIENT_FAILED,
        payload: err,
      });
    });
}
