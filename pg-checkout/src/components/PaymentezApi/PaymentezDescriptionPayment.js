import React from 'react';
import { connect } from 'react-redux';
import propTypes from "prop-types";
import { MDBBtn } from 'mdbreact';
import ConnectedPaymentCreditCardPaymentez from "./PaymentCreditCardPaymentez"
const { I18n } = require('react-i18nify');

export const PaymentezDescriptionPayment = ({ currentTheme, orderData, ...props }) => {
    const typeOrder = "paymentez";
    return (

        <div className="full-centering">
            <ConnectedPaymentCreditCardPaymentez {...props} orderData={orderData} currentTheme={currentTheme}>
                <MDBBtn color="none" style={{ "background": currentTheme.primary_color, width: "100%" }}>
                    {I18n.t(`payment-action-button-${typeOrder}`)}
                </MDBBtn>
            </ConnectedPaymentCreditCardPaymentez>
        </div >
    )
}

PaymentezDescriptionPayment.propTypes = {
    orderId: propTypes.string,
    currentTheme: propTypes.object
}

const mapStateToProps = (state) => ({ //state, ownProps
    currentTheme: state.theme,
});

const ConnectedPaymentezDescriptionPayment = connect(
    mapStateToProps
)(PaymentezDescriptionPayment)

export default ConnectedPaymentezDescriptionPayment;
