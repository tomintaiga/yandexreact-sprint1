import { SHOW_ORDER, HIDE_ORDER } from "../actions/order";

const initialState = {
    showOrder: false,
    order: null,
}

export const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case SHOW_ORDER: {
            return {
                ...state,
                showOrder: true,
                order: action.payload,
            }
        }
        case HIDE_ORDER: {
            return {
                ...state,
                showOrder: false,
                order: null,
            }
        }
        default:
            return state;
    }
}