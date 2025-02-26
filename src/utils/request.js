export const checkError = (response) => {
    if(response.ok) {
        return response.json();
    }

    return Promise.reject(`Ошибка ${response.status}`);
}

export const BASE_URL = "https://norma.nomoreparties.space/api";