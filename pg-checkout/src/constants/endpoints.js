/* global __CCAPI_ENV__, __NOCCAPI_ENV__ */
import Themes from "../reducers/themes";

const domain = Themes.getThemeByLocation().domain;
export const NOCCAPI_URL = __NOCCAPI_ENV__ !== "undefined" ? `https://${__NOCCAPI_ENV__}.${domain}` : `https://noccapi-stg.${domain}`;
export const ORDER_DETAILS = NOCCAPI_URL + "/linktopay/get_order/";
export const RESPONSE_PAYMENTEZ_SEND_PAYCARD = NOCCAPI_URL + "/linktopay/pay_card/";
export const INFORMATION_TRANSACTION = NOCCAPI_URL + "/linktopay/transaction/info/";
export const PAYMENTEZ_API_ENV = __CCAPI_ENV__ !== "undefined" ? __CCAPI_ENV__ : "stg";
