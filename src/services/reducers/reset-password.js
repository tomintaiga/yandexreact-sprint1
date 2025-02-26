import { RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST } from "../actions/reset-password";

const initialState = {
    resetPasswordRequest: false,
    resetPasswordError: false,
}

export const resetPasswordReducer = (state = initialState, action) => {
    switch(action.type){
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordError: false,
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordError: false,
            }
        }
        case RESET_PASSWORD_FAILED: {
            console.log(action.payload);
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordError: true,
            }
        }
        default:
            return state;
    }
}