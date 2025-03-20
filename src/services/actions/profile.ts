export const PROFILE_REQUEST:'PROFILE_REQUEST' = 'PROFILE_REQUEST';
export const PROFILE_REQUEST_SUCCESS:'PROFILE_REQUEST_SUCCESS' = 'PROFILE_REQUEST_SUCCESS';
export const PROFILE_REQUEST_FAILED:'PROFILE_REQUEST_FAILED' = 'PROFILE_REQUEST_FAILED';
export const PROFILE_EDIT_REQUEST:'PROFILE_EDIT_REQUEST' = 'PROFILE_EDIT_REQUEST';
export const PROFILE_EDIT_SUCCESS:'PROFILE_EDIT_SUCCESS' = 'PROFILE_EDIT_SUCCESS';
export const PROFILE_EDIT_FAILED:'PROFILE_EDIT_FAILED' = 'PROFILE_EDIT_FAILED';

export const PROFILE_SET_NAME:'PROFILE_SET_NAME' = 'PROFILE_SET_NAME';
export const PROFILE_SET_EMAIL:'PROFILE_SET_EMAIL' = 'PROFILE_SET_EMAIL';
export const PROFILE_SET_PASSWORD:'PROFILE_SET_PASSWORD' = 'PROFILE_SET_PASSWORD';

import { getCookie } from '../../utils/cookie';
import { BASE_URL } from '../../utils/request';
import { Dispatch } from 'redux';

import { fetchWithRefresh } from './auth';
import { TUser } from '../../../declarations/user';

const profileUrl = `${BASE_URL}/auth/user`;

export interface IProfileRequest {
  type: typeof PROFILE_REQUEST;
};

export interface IProfileRequestSuccess {
  type: typeof PROFILE_REQUEST_SUCCESS;
  payload: TUser;
};

export interface IProfileRequestFailed {
  type: typeof PROFILE_REQUEST_FAILED;
  payload: Error;
};

export interface IProfileEditRequest {
  type: typeof PROFILE_EDIT_REQUEST;
};

export interface IProfileEditSuccess {
  type: typeof PROFILE_EDIT_SUCCESS;
  payload: TUser;
};

export interface IProfileEditFailed {
  type: typeof PROFILE_EDIT_FAILED;
  payload: Error;
};

export interface IProfileSetName {
  type: typeof PROFILE_SET_NAME;
  payload: string;
};

export interface IProfileSetEmail {
  type: typeof PROFILE_SET_EMAIL;
  payload: string;
};

export interface IProfileSetPassword {
  type: typeof PROFILE_SET_PASSWORD;
  payload: string;
};

export type TProfileActions = IProfileRequest | IProfileRequestSuccess | IProfileRequestFailed | IProfileEditRequest | IProfileEditSuccess | IProfileEditFailed | IProfileSetName | IProfileSetEmail | IProfileSetPassword;

export function getProfile(dispatch:Dispatch) {
  dispatch({ type: PROFILE_REQUEST });

  fetchWithRefresh(dispatch, profileUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(getCookie('token') ? { Authorization: getCookie('token') } : {}),
    } as HeadersInit,
  })
    .then((data) => {
      if (data.success === true) {
        dispatch({
          type: PROFILE_REQUEST_SUCCESS,
          payload: data.user,
        });
      } else {
        dispatch({ type: PROFILE_REQUEST_FAILED });
      }
    })
    .catch((e) => dispatch({ type: PROFILE_EDIT_FAILED, payload: e }));
}

export function editProfile(dispatch:Dispatch, user:TUser) {
  dispatch({ type: PROFILE_EDIT_REQUEST });

  fetchWithRefresh(dispatch, profileUrl, {
    method: 'PATHC',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(getCookie('token') ? { Authorization: getCookie('token') } : {}),
    } as HeadersInit,
    body: JSON.stringify(user),
  })
    .then((data) => {
      if (data.success === true) {
        dispatch({
          type: PROFILE_EDIT_SUCCESS,
          payload: data.user,
        });
      } else {
        dispatch({ type: PROFILE_EDIT_FAILED });
      }
    })
    .catch((e) => dispatch({ type: PROFILE_EDIT_FAILED, payload: e }));
}
