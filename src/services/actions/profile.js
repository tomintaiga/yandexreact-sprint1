export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_REQUEST_SUCCESS = 'PROFILE_REQUEST_SUCCESS';
export const PROFILE_REQUEST_FAILED = 'PROFILE_REQUEST_FAILED';
export const PROFILE_EDIT_REQUEST = 'PROFILE_EDIT_REQUEST';
export const PROFILE_EDIT_SUCCESS = 'PROFILE_EDIT_SUCCESS';
export const PROFILE_EDIT_FAILED = 'PROFILE_EDIT_FAILED';

export const PROFILE_SET_NAME = 'PROFILE_SET_NAME';
export const PROFILE_SET_EMAIL = 'PROFILE_SET_EMAIL';
export const PROFILE_SET_PASSWORD = 'PROFILE_SET_PASSWORD';

import { getCookie } from '../../utils/cookie';
import { BASE_URL } from '../../utils/request';

import { fetchWithRefresh } from './auth';

const profileUrl = `${BASE_URL}/auth/user`;

export function getProfile(dispatch) {
  dispatch({ type: PROFILE_REQUEST });

  fetchWithRefresh(dispatch, profileUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: getCookie('token'),
    },
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

export function editProfile(dispatch, user) {
  dispatch({ type: PROFILE_EDIT_REQUEST });

  fetchWithRefresh(dispatch, profileUrl, {
    method: 'PATHC',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getCookie('token'),
    },
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
