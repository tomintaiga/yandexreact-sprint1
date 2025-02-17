import { checkError } from "../../utils/request";

export const SHOW_ORDER = "SHOW_ORDER";
export const HIDE_ORDER = "HIDE_ORDER";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_REQUEST_SUCESS = "ORDER_REQUEST_SUCESS";
export const ORDER_REQUEST_FAILED = "ORDER_REQUEST_FAILED";

const url = "https://norma.nomoreparties.space/api/orders";

// order - must be an array of ingredients
export function sendOrder(dispatch, order) {
    // Set loading status
    dispatch({
        type: ORDER_REQUEST,
    });

    // Prepare order
    const orderData = {
        ingredients: order.map(item => item._id),
    }

    // Send request
    fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData),
        })
        .then(checkError)
        .then(data => {
            if(data.success === true) {
                dispatch({
                    type: ORDER_REQUEST_SUCESS,
                    payload: {name: data.name, number: data.order.number}
                });
            } else {
                dispatch({
                    type: ORDER_REQUEST_FAILED,
                    payload: data.message,
                });
            }
        })
        .catch(err => {
            dispatch({
                type: ORDER_REQUEST_FAILED,
                payload: err,
            })
        });

    dispatch({
        type: SHOW_ORDER,
    });
}