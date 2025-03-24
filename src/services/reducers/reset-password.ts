import {
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
} from '../actions/reset-password';

import { TResetPasswordActions } from '../actions/reset-password';

export type TResetPasswordState = {
  resetPasswordRequest: boolean,
  resetPasswordError: boolean,
};

const initialState: TResetPasswordState = {
  resetPasswordRequest: false,
  resetPasswordError: false,
};

export const resetPasswordReducer = (state: TResetPasswordState = initialState, action: TResetPasswordActions) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordError: false,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordError: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      console.log(action.payload);
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordError: true,
      };
    }
    default:
      return state;
  }
};
