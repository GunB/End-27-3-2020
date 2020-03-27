import React, { Component } from "react";
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { MDBCol } from "mdbreact";
import { I18n } from 'react-i18nify';
import { filterPaymentMethod } from "../filters/filterPaymentMethod";
import * as PAYMENTMETHODSCONST from './../constants/paymentMethods';
import ConnectedPaymentezDescriptionPayment from "./PaymentezApi/PaymentezDescriptionPayment";
import { PSE_LOGO } from "../constants/resources";
import ConnectedPSEPaymentComponent from "./OtherPaymentApi/PSEPaymentComponent";
import ConnectedCashPaymentComponent from "./OtherPaymentApi/CashPaymentComponent";

export class PaymentMethodCollapse extends Component {

    createPaymentMethod(paymentMethodName, payment) {
        paymentMethodName = paymentMethodName.toLowerCase();
        const { orderId, currentTheme } = this.props;
        let data = undefined;
        let order = { orderId, payment: { ...payment }, orderData: this.props.orderData, currentTheme };

        switch (true) {
            case new RegExp(PAYMENTMETHODSCONST.CREDIT, "i").test(paymentMethodName):
                data = <ConnectedPaymentezDescriptionPayment {...order} />
                break
            case new RegExp(PAYMENTMETHODSCONST.DEBIT, "i").test(paymentMethodName):
                order = {
                    ...order,
                    typeOrder: "pse",
                    logo: PSE_LOGO
                }
                data = <ConnectedPSEPaymentComponent {...order} {...this.props.orderData} />
                break;
            case new RegExp(PAYMENTMETHODSCONST.CASH, "i").test(paymentMethodName):
                order = {
                    ...order,
                    typeOrder: "cash",
                }
                data = <ConnectedCashPaymentComponent {...order} />
                break;
        }
        return data;
    }

    render() {
        const { paymentMethods, currentTheme } = this.props;
        return (
            <>
                {
                    paymentMethods.length ?
                        < h4 style={{ color: currentTheme.primary_color }} className="pt-4 text-center">
                            <strong>{I18n.t('pick-payment-method')}</strong>
                        </h4> : null
                }

                <div className="row">
                    {
                        paymentMethods.map((payment) => {
                            const paymentName = payment.name.toLowerCase()
                            return (
                                <MDBCol className="px-1" key={`collapse-key-${paymentName}`} md="12">
                                    {this.createPaymentMethod(paymentName, payment)}
                                </MDBCol>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const payment = state.detalles && state.detalles.data ? state.detalles.data.payment : {};
    return ({ //state, ownProps
        currentTheme: state.theme,
        paymentMethods: filterPaymentMethod(payment)
    })
};

PaymentMethodCollapse.propTypes = {
    orderId: PropTypes.string,
    currentTheme: PropTypes.object,
    paymentMethods: PropTypes.arrayOf(PropTypes.object)
};

const ConectedPaymentMethodCollapse = connect(
    mapStateToProps
)(PaymentMethodCollapse)

export default ConectedPaymentMethodCollapse;