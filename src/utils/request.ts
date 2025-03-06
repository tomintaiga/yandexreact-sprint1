export async function checkError(response: Response): Promise<any> {
  if (response.ok) {
    return response.json();
  } else {
    const data = await response.json();
    return Promise.reject(data);
  }
}

export const BASE_URL = 'https://norma.nomoreparties.space/api';
