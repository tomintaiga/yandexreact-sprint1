import { checkError } from '../../utils/request';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' =
  'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' =
  'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' =
  'FORGOT_PASSWORD_FAILED';

import { BASE_URL } from '../../utils/request';
import { Dispatch } from 'redux';

const url = `${BASE_URL}/password-reset`;

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
};

export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
};

export interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
  payload: string;
};

export type TForgotPasswordActions =
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordFailed;

export function forgotPassword(dispatch: Dispatch, email: string) {
  dispatch({
    type: FORGOT_PASSWORD_REQUEST,
  });

  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then(checkError)
    .then((data) => {
      if (data.success === true) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
        // TODO: add redirect to /reset-password
      } else {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
          payload: data.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: FORGOT_PASSWORD_FAILED,
        payload: err,
      });
    });
}
