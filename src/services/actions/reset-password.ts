import { checkError } from '../../utils/request';

export const RESET_PASSWORD_REQUEST:'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS:'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED:'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

import { BASE_URL } from '../../utils/request';
import { Dispatch } from 'redux';

const url = `${BASE_URL}/password-reset/reset`;

export interface IResetPasswordRequest {
  type: typeof RESET_PASSWORD_REQUEST;
};

export interface IResetPasswordSuccess {
  type: typeof RESET_PASSWORD_SUCCESS;
};

export interface IResetPasswordFailed {
  type: typeof RESET_PASSWORD_FAILED;
  payload: string;
};

export type TResetPasswordActions =
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed;

export function resetPassword(dispatch: Dispatch, password: string, token: string) {
  dispatch({
    type: RESET_PASSWORD_REQUEST,
  });

  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  })
    .then(checkError)
    .then((data) => {
      if (data.success === true) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED,
          payload: data.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        payload: err,
      });
    });
}
