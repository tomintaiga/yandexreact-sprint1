
export const GET_INGEDIENT_REQUEST = 'GET_INGEDIENT_REQUEST';
export const GET_INGEDIENT_SUCCESS = 'GET_INGEDIENT_SUCCESS';
export const GET_INGEDIENT_FAILED = 'GET_INGEDIENT_FAILED';

const url = "https://norma.nomoreparties.space/api/ingredients";

// Сортировка ингредиентов
const sortIngredients = (data) => {
    const buns = data.filter(item => item.type === "bun");
    const sauces = data.filter(item => item.type === "sauce");
    const mains = data.filter(item => item.type === "main");
    return [...buns, ...sauces, ...mains];
}

export function loadIngredients(dispatch) {
    // Set loading status
    dispatch({
        type: GET_INGEDIENT_REQUEST,
    });

    fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => {
            // Проверка ответа сервера
            if (data.success === true) {
                dispatch({
                    type: GET_INGEDIENT_SUCCESS,
                    value: sortIngredients(data.data), // Записываем отсортированные ингредиенты
                });
            } else {
                // Обработка ошибки
                dispatch({
                    type: GET_INGEDIENT_FAILED,
                    value: data.message
                });
            }
        })
        .catch(err => {
            // Обработка ошибки
            dispatch({
                type: GET_INGEDIENT_FAILED,
                value: err
            })
        });
};
