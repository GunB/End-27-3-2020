import { CURRENCIES } from "../constants/paymentMethods";

export const getCurrencySymbol = (curr) => {
    const data = CURRENCIES.find((currency) => {
        return currency.currency.indexOf(`${curr}`.toUpperCase());
    })
    return data || null;
}

export const getFormatedNumberToCurrency = (amount, currency) => {
    return currency ? new Intl.NumberFormat(getCurrencySymbol(currency).style,
        { style: 'currency', currency, minimumFractionDigits: 0 }
    ).format(amount) : null
}