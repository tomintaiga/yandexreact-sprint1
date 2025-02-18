import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILED } from "../actions/auth";
import { AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILED } from "../actions/auth";

const initialState = {
    user: null,
    token: null,
    refreshToken: null,
    isAuth: false,
    isLoginRequest: false,
    isLoginError: false,
    isRegisterRequest: false,
    isRegisterError: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return {
                ...state,
                isAuth: false,
                isLoginRequest: true,
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
                user: action.payload.user,
                token: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        case AUTH_REGISTER_REQUEST:
            return {
                ...state,
                isAuth: false,
                isRegisterRequest: true,
            };
        case AUTH_REGISTER_FAILED: {
            console.log(action.payload);
            return {
                ...state,
                isAuth: false,
                isRegisterRequest: false,
                isRegisterError: true,
            };
        }
        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                isRegisterRequest: false,
                user: action.payload.user,
                token: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        default:
            return state;
    }
}
