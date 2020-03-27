import * as Actions from '../constants/actionTypes';
import { RESPONSE_PAYMENTEZ_SEND_PAYCARD } from '../constants/endpoints';
import { getAuth } from '../auth/Auth';
import { push } from 'connected-react-router'
import { INFO_RESPONSE_PAYMENT } from '../constants/config';
import { changeCurrentTheme } from './themeActions';
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

export function changeServerData(response) {
  return { type: Actions.SERVER_ANSWER, value: response }
}

export const fetchPostServerPaymanetezStatus = (response, orderId) => {
  return fetch(`${RESPONSE_PAYMENTEZ_SEND_PAYCARD}${orderId}/`, {
    method: "POST",
    body: JSON.stringify(response),
    headers: new Headers({
      'Auth-Token': getAuth(),
      'Content-Type': 'application/json'
    }),
    credentials: "same-origin"
  })
}

export const asyncFetchPostServerPaymanetezStatus = (response, orderId) => {
  return function (dispatch) {
    return fetchPostServerPaymanetezStatus(response, orderId)
      .then(response => response.json())
      .then((orderData) => {
        dispatch(changeServerData(orderData))
        return dispatch(push(INFO_RESPONSE_PAYMENT))
      })
      .catch(error => {
        console.error(error);
        return dispatch(changeServerData(error))
      });
  };
}

export const fetchGetServerData = (Url) => {
  return fetch(`${Url}`, {
    method: "GET",
    headers: new Headers({
      'Auth-Token': getAuth(),
      'Content-Type': 'application/json'
    }),
    credentials: "same-origin"
  })
}

export const asyncFetchGetServerData = (Url) => {
  return function (dispatch) {
    return fetchGetServerData(Url)
      .then(response => response.json())
      .then((orderData) => {
        orderData && orderData.data && orderData.data.application ? (() => {
          dispatch(changeCurrentTheme(orderData.data.application))
          delete orderData.data.application;
        })() : false;
        
        return dispatch(changeServerData(orderData))
      }
      ).catch(error => {
        console.error(error);
        return dispatch(changeServerData(error))
      });
  };
}

export const fetchOtherPaymentStatus = (url, data) => {
  return fetch(`${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      'Auth-Token': getAuth(),
      'Content-Type': 'application/json'
    }),
    credentials: "same-origin"
  })
}

export const asyncfetchOtherPaymentStatus = (url, data) => {
  return function (dispatch) {
    return fetchOtherPaymentStatus(url, data)
      .then(response => response.json())
      .then((orderData) => {
        dispatch(changeServerData(orderData))
        return dispatch(push(INFO_RESPONSE_PAYMENT))
      }
      ).catch(error => {
        console.error(error);
        return dispatch(changeServerData(error))
      });
  };
}