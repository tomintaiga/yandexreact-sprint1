import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILED } from "../actions/auth";
import { AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILED } from "../actions/auth";
import { AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAILED } from "../actions/auth";
import { AUTH_TOKEN_REQUEST, AUTH_TOKEN_SUCCESS, AUTH_TOKEN_FAILED } from "../actions/auth";

const initialState = {
    user: null,
    token: null,
    refreshToken: null,
    isAuth: false,
    isLoginRequest: false,
    isLoginError: false,
    isRegisterRequest: false,
    isRegisterError: false,
    isLogoutRequest: false,
    isLogoutError: false,
    isTokenRequest: false,
    isTokenError: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return {
                ...state,
                isAuth: false,
                isLoginRequest: true,
                isLoginError: false,
            };
        case AUTH_LOGIN_FAILED: {
            console.log(action.payload);
            return {
                ...state,
                isAuth: false,
                isLoginRequest: false,
                isLoginError: true,
            };
        }
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                isLoginRequest: false,
                isLoginError: false,
                user: action.payload.user,
                token: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        case AUTH_REGISTER_REQUEST:
            return {
                ...state,
                isRegisterRequest: true,
                isRegisterError: false,
            };
        case AUTH_REGISTER_FAILED: {
            console.log(action.payload);
            return {
                ...state,
                isRegisterRequest: false,
                isRegisterError: true,
            };
        }
        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                isRegisterRequest: false,
                isRegisterError: false,
                user: action.payload.user,
                token: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        case AUTH_LOGOUT_REQUEST:
            return {
                ...state,
                isLogoutRequest: true,
                isLoginError: false,
            };
        case AUTH_LOGOUT_FAILED: {
            console.log(action.payload);
            return {
                ...state,
                isLogoutRequest: false,
                isLogoutError: true,
            };
        }
        case AUTH_LOGOUT_SUCCESS:
            return {
                ...state,
                isLogoutRequest: false,
                isLogoutError: false,
                isAuth: false,
                user: null,
                token: null,
                refreshToken: null,
            };
        case AUTH_TOKEN_REQUEST:
            return {
                ...state,
                isTokenRequest: true,
                isTokenError: false,
            };
        case AUTH_TOKEN_FAILED: {
            console.log(action.payload);
            return {
                ...state,
                isTokenRequest: false,
                isTokenError: true,
            };
        }
        case AUTH_TOKEN_SUCCESS:
            return {
                ...state,
                isTokenRequest: false,
                isTokenError: false,
                isAuth: true,
                user: action.payload.user,
                token: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        default:
            return state;
    }
}
