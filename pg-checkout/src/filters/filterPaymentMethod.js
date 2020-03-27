import * as PAYMENTMETHODS from './../constants/paymentMethods';

export const filterPaymentMethod = (paymentMethodsUserObject = {}) => {
    const paymentMethodsFilter = [PAYMENTMETHODS.CREDIT, PAYMENTMETHODS.CASH, PAYMENTMETHODS.DEBIT];
    const keys = Object.keys(paymentMethodsUserObject);
    const regex = new RegExp(paymentMethodsFilter.join("|"), "i");
    let paymentMethods = []
    for (let i = 0; i < keys.length; i++) {
        let payChecking = paymentMethodsUserObject[keys[i]];
        if (regex.test(payChecking.name)) {
            paymentMethods.push(payChecking)
        }
    }
    return paymentMethods;
};