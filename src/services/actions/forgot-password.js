import { checkError } from "../../utils/request";
import { useNavigate } from "react-router-dom";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

const url = "https://norma.nomoreparties.space/api/password-reset";

export function resetPassword(dispatch, email) {
    dispatch({
        type: FORGOT_PASSWORD_REQUEST
    });

    fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        }),
    })
    .then(checkError)
    .then(data => {
        if(data.success === true) {
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
            });
        } else {
            dispatch({
                type: FORGOT_PASSWORD_FAILED,
                payload: data.message,
            });
        }
    })
    .catch(err => {
        dispatch({
            type: FORGOT_PASSWORD_FAILED,
            payload: err
        })
    });
}