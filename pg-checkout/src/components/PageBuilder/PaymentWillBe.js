import React from 'react';
import PropTypes from 'prop-types';
import { getFormatedNumberToCurrency } from '../../utils/CurrencyFormat';

const PaymentWillBe = ({ currency, amount, ...props }) => {
    return (<span {...props}>
        {getFormatedNumberToCurrency(amount, currency)}
    </span>);
}

PaymentWillBe.propTypes = {
    currency: PropTypes.string,
    amount: PropTypes.any
}

export default PaymentWillBe;