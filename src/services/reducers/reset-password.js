import { RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST } from "../actions/reset-password";

const initialState = {
    resetPasswordLoading: false,
    resetPasswordLoadingError: false,
}

export const resetPasswordReducer = (state = initialState, action) => {
    switch(action.type){
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordLoading: true,
                resetPasswordLoadingError: false,
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordLoading: false,
                resetPasswordLoadingError: false,
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordLoading: false,
                resetPasswordLoadingError: true,
            }
        }
        default:
            return state;
    }
}