import * as Actions from '../constants/actionTypes';
import { ORDER_DETAILS } from '../constants/endpoints';
import { getAuth } from './../auth/Auth';
import { changeCurrentTheme } from './themeActions';

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export const changeDetailsOrder = (fullOrderData) => {
    return {
        type: Actions.CHANGE_DETAILS_ORDER,
        value: fullOrderData
    };
}

export const errorDetailsOrder = (error) => ({
    type: Actions.ERROR_CHANGE_DETAILS_ORDER,
    value: error
});

export const fetchDetailsOrder = (order_id_generado) => {
    return fetch(`${ORDER_DETAILS}?order_id=${order_id_generado}`, {
        method: "GET",
        headers: new Headers({
            'Auth-Token': getAuth(),
            'Content-Type': 'application/json'
        }),
        credentials: "same-origin"
    });
}

export const asyncChangeDetailsOrder = (idOrder) => {
    return function (dispatch) {
        return fetchDetailsOrder(idOrder)
            .then(response => response.json())
            .then(orderData => {
                orderData && orderData.data && orderData.data.application ? (() => {
                    dispatch(changeCurrentTheme(orderData.data.application))
                    delete orderData.data.application;
                })() : false;
                return dispatch(changeDetailsOrder(orderData))
            })
            .catch(error => {
                console.error(error);
                return dispatch(errorDetailsOrder(error))
            });
    };
}
