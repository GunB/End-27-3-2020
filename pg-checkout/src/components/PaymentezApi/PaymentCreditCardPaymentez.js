import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncFetchPostServerPaymanetezStatus } from '../../actions/serverAnswerActions.js';
import { PAYMENTEZ_API_ENV } from '../../constants/endpoints.js';
import { I18n } from 'react-i18nify';
//require('../../lib/paymentez/paymentez-checkout.min.js');

export const PaymentCreditCardPaymentez = ({ detalles, currentTheme, orderData, orderId, children = undefined, responseStatus }) => {

    const client_app = {
        client_app_code: detalles.data.payment.card.app_code,//'LINKTOPAY-CLIENT', // Client Credentials Provied by Paymentez,
        client_app_key: detalles.data.payment.card.app_key, // Client Credentials Provied by Paymentez,
        locale: I18n._localeKey, // User's preferred language (es, en, pt). English will be used by default.
        env_mode: PAYMENTEZ_API_ENV, // `prod`, `stg`, `local` to change environment. Default is `stg`
    }

    const showForm = () => {
        /* eslint-disable no-undef */
        /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
        var paymentezCheckout = new PaymentezCheckout.modal({ // eslint-disable-line no-use-before-define
            ...client_app,
            onOpen: function () {
                //console.log('modal open')
            },
            onClose: function () {
                //console.log('modal closed')
            },
            onResponse: function (response) {
                responseStatus(response, orderId);
            }
        });

        paymentezCheckout.open({
            user_id: detalles.data.user.id,
            user_email: orderData["user-email"] || detalles.data.user.email, //optional
            user_phone: orderData["user-phone"] || detalles.data.user.user_phone, //optional
            order_description: orderData["order-description"] || detalles.data.order.description,
            order_amount: orderData["order-amount"] || detalles.data.order.amount,
            order_vat: detalles.data.order.vat,
            order_reference: orderData["order-dev_reference"] || detalles.data.order.dev_reference,
            order_installments_type: detalles.data.order.installments_type, // optional: The installments type are only available for Equador. The valid values are: https://paymentez.github.io/api-doc/#installments-type. To another countries, use 0 to use installments configured with Paymentez or -1 to not use installments.
            // order_taxable_amount: 0, // optional: Only available for Datafast (Equador). The taxable amount, if it is zero, it is calculated on the total. Format: Decimal with two fraction digits.
            // order_tax_percentage: 10 // optional: Only available for Datafast (Equador). The tax percentage to be applied to this order.
            conf_exclusive_types: detalles.data.order.conf_exclusive_types, // optional: Allowed card types to this operation
            conf_invalid_card_type_message: I18n.t('paymentez-conf_invalid_card_type_message'), // optional: Define a custom message to show for invalid card types
            style_version: "2",
            theme: currentTheme
        })

        window.addEventListener('popstate', function () {
            paymentezCheckout.close();
        });
        /* eslint-enable no-undef */
    }
    return children ?
        React.cloneElement(children, { onClick: showForm }) :
        <button className="enlace" onClick={showForm}>Pago con tarjeta</button>
}

const mapStateToProps = (state) => ({ //state, ownProps
    currentTheme: state.theme,
    detalles: state.detalles
});

const mapDisptachToProps = (dispatch) => ({
    responseStatus: (response, orderId) => dispatch(asyncFetchPostServerPaymanetezStatus(response, orderId)),
})

PaymentCreditCardPaymentez.propTypes = {
    detalles: PropTypes.object,
    orderId: PropTypes.string,
    children: PropTypes.any,
    responseStatus: PropTypes.any,
    orderData: PropTypes.object,
    currentTheme: PropTypes.object
};

const conectedPaymentCreditCardPaymentez = connect(
    mapStateToProps,
    mapDisptachToProps
)(PaymentCreditCardPaymentez);

export default conectedPaymentCreditCardPaymentez;
