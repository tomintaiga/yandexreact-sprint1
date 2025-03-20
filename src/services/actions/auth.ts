import { checkError } from '../../utils/request';
import { setCookie, getCookie } from '../../utils/cookie';
import { Dispatch } from 'redux';

export const AUTH_LOGIN_REQUEST: 'AUTH_LOGIN_REQUEST' = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS' = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILED: 'AUTH_LOGIN_FAILED' = 'AUTH_LOGIN_FAILED';

export const AUTH_REGISTER_REQUEST: 'AUTH_REGISTER_REQUEST' =
  'AUTH_REGISTER_REQUEST';
export const AUTH_REGISTER_SUCCESS: 'AUTH_REGISTER_SUCCESS' =
  'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_FAILED: 'AUTH_REGISTER_FAILED' =
  'AUTH_REGISTER_FAILED';

export const AUTH_LOGOUT_REQUEST: 'AUTH_LOGOUT_REQUEST' = 'AUTH_LOGOUT_REQUEST';
export const AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS' = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_FAILED: 'AUTH_LOGOUT_FAILED' = 'AUTH_LOGOUT_FAILED';

export const AUTH_TOKEN_REQUEST: 'AUTH_TOKEN_REQUEST' = 'AUTH_TOKEN_REQUEST';
export const AUTH_TOKEN_SUCCESS: 'AUTH_TOKEN_SUCCESS' = 'AUTH_TOKEN_SUCCESS';
export const AUTH_TOKEN_FAILED: 'AUTH_TOKEN_FAILED' = 'AUTH_TOKEN_FAILED';

import { BASE_URL } from '../../utils/request';
import { TUser } from '../../../declarations/user';

const loginUrl = `${BASE_URL}/auth/login`;
const registerUrl = `${BASE_URL}/auth/register`;
const logoutUrl = `${BASE_URL}/auth/logout`;
const tokenUrl = `${BASE_URL}/auth/token`;

const COOKIE_EXPIRES = 24 * 60 * 60;

export type TAuthResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user?: TUser;
  message?: string;
};

export interface IAuthLoginRequest {
  readonly type: typeof AUTH_LOGIN_REQUEST;
};

export interface IAuthLoginSuccess {
  readonly type: typeof AUTH_LOGIN_SUCCESS;
  payload: TAuthResponse;
};

export interface IAuthLoginFailed {
  readonly type: typeof AUTH_LOGIN_FAILED;
  payload: string;
};

export interface IAuthRegisterRequest {
  readonly type: typeof AUTH_REGISTER_REQUEST;
};

export interface IAuthRegisterSuccess {
  readonly type: typeof AUTH_REGISTER_SUCCESS;
  payload: TAuthResponse;
};

export interface IAuthRegisterFailed {
  readonly type: typeof AUTH_REGISTER_FAILED;
  payload: string;
};

export interface IAuthLogoutRequest {
  readonly type: typeof AUTH_LOGOUT_REQUEST;
};

export interface IAuthLogoutSuccess {
  readonly type: typeof AUTH_LOGOUT_SUCCESS;
  payload: TAuthResponse;
};

export interface IAuthLogoutFailed {
  readonly type: typeof AUTH_LOGOUT_FAILED;
  payload: string;
};

export interface IAuthTokenRequest {
  readonly type: typeof AUTH_TOKEN_REQUEST;
};

export interface IAuthTokenSuccess {
  readonly type: typeof AUTH_TOKEN_SUCCESS;
  payload: TAuthResponse;
};

export interface IAuthTokenFailed {
  readonly type: typeof AUTH_TOKEN_FAILED;
  payload: string;
};

export type TAuthActions =
  | IAuthLoginRequest
  | IAuthLoginSuccess
  | IAuthLoginFailed
  | IAuthRegisterRequest
  | IAuthRegisterSuccess
  | IAuthRegisterFailed
  | IAuthLogoutRequest
  | IAuthLogoutSuccess
  | IAuthLogoutFailed
  | IAuthTokenRequest
  | IAuthTokenSuccess
  | IAuthTokenFailed;


export function login(
  dispatch: Dispatch,
  email: string,
  password: string,
): void {
  dispatch({
    type: AUTH_LOGIN_REQUEST,
  });

  fetch(loginUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(checkError)
    .then((data: TAuthResponse) => {
      if (data.success) {
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: data,
        });
        setCookie('token', data.accessToken, { expires: COOKIE_EXPIRES });
        setCookie('user', JSON.stringify(data.user), {
          expires: COOKIE_EXPIRES,
        });
        setCookie('refreshToken', data.refreshToken, {
          expires: COOKIE_EXPIRES,
        });
      } else {
        dispatch({
          type: AUTH_LOGIN_FAILED,
          payload: data.message,
        });
      }
    })
    .catch((err: Error) => {
      dispatch({
        type: AUTH_LOGIN_FAILED,
        payload: err.message,
      });
    });
}

export function register(
  dispatch: Dispatch,
  email: string,
  password: string,
  name: string,
): void {
  dispatch({
    type: AUTH_REGISTER_REQUEST,
  });

  fetch(registerUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  })
    .then(checkError)
    .then((data: TAuthResponse) => {
      if (data.success) {
        dispatch({
          type: AUTH_REGISTER_SUCCESS,
          payload: data,
        });
        setCookie('token', data.accessToken, { expires: COOKIE_EXPIRES });
      } else {
        dispatch({
          type: AUTH_REGISTER_FAILED,
          payload: data.message,
        });
      }
    })
    .catch((err: Error) => {
      dispatch({
        type: AUTH_REGISTER_FAILED,
        payload: err.message,
      });
    });
}

export function logout(dispatch: Dispatch, refreshToken: string): void {
  dispatch({
    type: AUTH_LOGOUT_REQUEST,
  });

  fetch(logoutUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  })
    .then(checkError)
    .then((data: TAuthResponse) => {
      if (data.success) {
        dispatch({
          type: AUTH_LOGOUT_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: AUTH_LOGOUT_FAILED,
          payload: data.message,
        });
      }
    })
    .catch((err: Error) => {
      dispatch({
        type: AUTH_LOGOUT_FAILED,
        payload: err.message,
      });
    });
}

export function refreshToken(
  dispatch: Dispatch,
  refreshToken: string,
): Promise<TAuthResponse> {
  dispatch({
    type: AUTH_TOKEN_REQUEST,
  });

  return fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  })
    .then(checkError)
    .then((data: TAuthResponse) => {
      if (data.success) {
        dispatch({
          type: AUTH_TOKEN_SUCCESS,
          payload: data,
        });
        setCookie('token', data.accessToken, { expires: COOKIE_EXPIRES });
        return data;
      } else {
        dispatch({
          type: AUTH_TOKEN_FAILED,
          payload: data.message,
        });
        return Promise.reject(new Error(data.message));
      }
    })
    .catch((err: Error) => {
      dispatch({
        type: AUTH_TOKEN_FAILED,
        payload: err.message,
      });
      return Promise.reject(err);
    });
}

export const fetchWithRefresh = async (
  dispatch: Dispatch,
  url: string,
  options: RequestInit,
): Promise<any> => {
  try {
    const res = await fetch(url, options);
    return await checkError(res);
  } catch (err: any) {
    console.log(err);
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken(
        dispatch,
        getCookie('refreshToken') || '',
      );
      if (options.headers) {
        (options.headers as Record<string, string>).Authorization =
          `Bearer ${refreshData.accessToken}`;
      }
      const res = await fetch(url, options);
      return await checkError(res);
    } else {
      return Promise.reject(err);
    }
  }
};
