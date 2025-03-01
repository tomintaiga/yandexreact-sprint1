import { SHOW_ORDER, HIDE_ORDER } from '../actions/order';
import {
  ORDER_REQUEST,
  ORDER_REQUEST_FAILED,
  ORDER_REQUEST_SUCESS,
} from '../actions/order';

const initialState = {
  showOrder: false,
  order: null,
  orderLoading: false,
  orderLoadingError: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ORDER: {
      return {
        ...state,
        showOrder: true,
        order: action.payload,
      };
    }
    case HIDE_ORDER: {
      return {
        ...state,
        showOrder: false,
        order: null,
      };
    }
    case ORDER_REQUEST: {
      return {
        ...state,
        orderLoading: true,
        orderLoadingError: false,
      };
    }
    case ORDER_REQUEST_SUCESS: {
      return {
        ...state,
        orderLoading: false,
        orderLoadingError: false,
        order: action.payload,
      };
    }
    case ORDER_REQUEST_FAILED: {
      console.log(ORDER_REQUEST_FAILED, action.payload);
      return {
        ...state,
        orderLoading: false,
        orderLoadingError: true,
        order: null,
      };
    }
    default:
      return state;
  }
};
