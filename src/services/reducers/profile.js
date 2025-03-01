import {
  PROFILE_REQUEST,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_FAILED,
} from '../actions/profile';
import {
  PROFILE_EDIT_REQUEST,
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_FAILED,
} from '../actions/profile';
import {
  PROFILE_SET_NAME,
  PROFILE_SET_EMAIL,
  PROFILE_SET_PASSWORD,
} from '../actions/profile';

const initialState = {
  user: null,
  name: '',
  email: '',
  password: '',
  profileRequest: false,
  profileRequestFailed: false,
  profileEditRequest: false,
  profileEditRequestFailed: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_REQUEST: {
      return {
        ...state,
        profileRequest: true,
        profileRequestFailed: false,
      };
    }
    case PROFILE_REQUEST_SUCCESS: {
      return {
        ...state,
        profileRequest: false,
        profileRequestFailed: false,
        user: action.payload,
        name: action.payload.name,
        email: action.payload.email,
      };
    }
    case PROFILE_REQUEST_FAILED: {
      console.log(action.payload);
      return {
        ...state,
        profileRequest: false,
        profileRequestFailed: true,
        user: null,
      };
    }
    case PROFILE_EDIT_REQUEST: {
      return {
        ...state,
        profileEditRequest: true,
        profileEditRequestFailed: false,
      };
    }
    case PROFILE_EDIT_SUCCESS: {
      return {
        ...state,
        profileEditRequest: false,
        profileEditRequestFailed: false,
        user: action.payload,
      };
    }
    case PROFILE_EDIT_FAILED: {
      console.log(action.payload);
      return {
        ...state,
        profileEditRequest: false,
        profileEditRequestFailed: true,
        // Тут нет обновления данных пользователя тк они не обнивились на бэке
      };
    }
    case PROFILE_SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case PROFILE_SET_EMAIL: {
      return {
        ...state,
        email: action.payload,
      };
    }
    case PROFILE_SET_PASSWORD: {
      return {
        ...state,
        password: action.password,
      };
    }
    default:
      return state;
  }
};
