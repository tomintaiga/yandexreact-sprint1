import { checkError } from "../../utils/request";

export const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILED = "AUTH_LOGIN_FAILED";
export const AUTH_REGISTER_REQUEST = "AUTH_REGISTER_REQUEST";
export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
export const AUTH_REGISTER_FAILED = "AUTH_REGISTER_FAILED";
export const AUTH_LOGOUT_REQUEST = "AUTH_LOGOUT_REQUEST";
export const AUTH_LOGOUT_SUCCESS = "AUTH_LOGOUT_SUCCESS";
export const AUTH_LOGOUT_FAILED = "AUTH_LOGOUT_FAILED";
export const AUTH_TOKEN_REQUEST = "AUTH_TOKEN_REQUEST";
export const AUTH_TOKEN_SUCCESS = "AUTH_TOKEN_SUCCESS";
export const AUTH_TOKEN_FAILED = "AUTH_TOKEN_FAILED";

const loginUrl = "https://norma.nomoreparties.space/api/auth/login";
const registerUrl = "https://norma.nomoreparties.space/api/auth/register";
const logoutUrl = "https://norma.nomoreparties.space/api/auth/logout";
const tokenUrl = "https://norma.nomoreparties.space/api/auth/token";

export function login(dispatch, email, password) {
    dispatch({
        type: AUTH_LOGIN_REQUEST
    });

    fetch(loginUrl, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    })
        .then(checkError)
        .then(data => {
            if (data.success === true) {
                dispatch({
                    type: AUTH_LOGIN_SUCCESS,
                    payload: data
                });
            } else {
                dispatch({
                    type: AUTH_LOGIN_FAILED,
                    payload: data.message,
                });
            }
        })
        .catch(err => {
            dispatch({
                type: AUTH_LOGIN_FAILED,
                payload: err
            })
        });
}

export function register(dispatch, email, password, name) {
    dispatch({
        type: AUTH_REGISTER_REQUEST
    });

    fetch(registerUrl, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        }),
    })
        .then(checkError)
        .then(data => {
            if (data.success === true) {
                dispatch({
                    type: AUTH_REGISTER_SUCCESS,
                    payload: data
                });
            } else {
                dispatch({
                    type: AUTH_REGISTER_FAILED,
                    payload: data.message,
                });
            }
        })
        .catch(err => {
            dispatch({
                type: AUTH_REGISTER_FAILED,
                payload: err
            })
        });
}

export function logout(dispatch, refreshToken) {
    dispatch({
        type: AUTH_LOGOUT_REQUEST
    });

    fetch(logoutUrl, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: refreshToken
        }),
    })
        .then(checkError)
        .then(data => {
            if (data.success === true) {
                dispatch({
                    type: AUTH_LOGOUT_SUCCESS,
                    payload: data
                });
            } else {
                dispatch({
                    type: AUTH_LOGOUT_FAILED,
                    payload: data.message,
                });
            }
        })
        .catch(err => {
            dispatch({
                type: AUTH_LOGOUT_FAILED,
                payload: err
            })
        });
}