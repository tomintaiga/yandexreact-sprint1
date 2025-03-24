import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  TForgotPasswordActions,
} from '../actions/forgot-password';

type TForgotPasswordState = {
  forgotPasswordLoading: boolean;
  forgotPasswordLoadingError: boolean;
  forgotPasswordSuccess: boolean;
};

const initialState: TForgotPasswordState = {
  forgotPasswordLoading: false,
  forgotPasswordLoadingError: false,
  forgotPasswordSuccess: false,
};

export const forgotPasswordReducer = (
  state: TForgotPasswordState = initialState,
  action: TForgotPasswordActions,
) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordLoading: true,
        forgotPasswordLoadingError: false,
        forgotPasswordSuccess: false,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordLoadingError: false,
        forgotPasswordSuccess: true,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordLoadingError: true,
        forgotPasswordSuccess: false,
      };
    }
    default:
      return state;
  }
};
