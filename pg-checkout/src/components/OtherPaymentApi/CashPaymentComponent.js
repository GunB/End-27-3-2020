import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from "prop-types";
//import JSONPretty from 'react-json-pretty';
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdbreact';
import { I18n } from 'react-i18nify';
import { formInterpreterPSE } from '../../utils/formInterpreterPSE';
import { asyncfetchOtherPaymentStatus } from '../../actions/serverAnswerActions';
import ModalPaymentLoading from '../PageBuilder/ModalPaymentLoading';
import { multiUpdateSingleMulti } from '../../utils/convertMultiLevelIntoSingle';

export class CashPaymentComponent extends Component {
    state = {
        modalLoading: false,
        isPaying: false
    }

    constructor() {
        super();
        this.modalForm = this.modalForm.bind(this);
        this.DoTogglePayment = this.DoTogglePayment.bind(this);
        this.myRef = React.createRef();
    }

    sendData = (formData = { formData: undefined }) => {
        const { url } = this.props.payment;
        const { responseStatus, orderDetails, orderData } = this.props;
        this.DoTogglePayment();
        this.DoToggle();

        const newData = multiUpdateSingleMulti(orderData, orderDetails.data);
        const newOrderData = {
            ...orderDetails, data: { ...newData }
        }

        const dataForm = formInterpreterPSE(newOrderData, formData.formData);
        responseStatus(url, dataForm)
    }

    DoToggle = () => {
        this.setState((prevState) => {
            const newState = !prevState.modalLoading;
            return { modalLoading: newState }
        });
    }

    DoTogglePayment = () => {
        this.setState((prevState) => {
            const newState = !prevState.isPaying;
            return { isPaying: newState }
        });
    }

    modalForm() {
        const { orderId, typeOrder = "", currentTheme } = this.props;
        let { isPaying } = this.state;
        const { sendData, DoTogglePayment } = this;
        return (
            <MDBModal className="modal-notify" isOpen={isPaying} size="lg" toggle={DoTogglePayment}>
                <MDBModalHeader toggle={DoTogglePayment}>
                    <strong>{I18n.t(`payment-title-${typeOrder}`)}</strong>
                </MDBModalHeader>
                <MDBModalBody>
                    <div className="row" key={`${orderId}`}>
                        <div className="col-12">
                            <p>{I18n.t(`payment-title-description-${typeOrder}`)}</p>
                            <ul>
                                <li >{I18n.t('payment-cash-recommend-1')}</li>
                                <li >{I18n.t('payment-cash-recommend-2')}</li>
                                <li >{I18n.t('payment-cash-recommend-3')}</li>
                                <li >{I18n.t('payment-cash-recommend-4')}</li>
                            </ul>
                        </div>
                    </div>
                </MDBModalBody>
                <MDBModalFooter className="">
                    <MDBBtn color="grey" onClick={DoTogglePayment}>{I18n.t(`payment-cancel-button`)}</MDBBtn>
                    <MDBBtn color="none"
                        style={{ "background": currentTheme.primary_color }}
                        onClick={() => { sendData() }}>{I18n.t(`payment-action-button-${typeOrder}`)}</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    render() {
        const { logo = "", typeOrder = "", currentTheme } = this.props;
        const { DoToggle, DoTogglePayment, modalForm } = this;
        const { modalLoading } = this.state;
        return (<>
            <ModalPaymentLoading {...{ modalLoading, typeOrder, logo, DoToggle }} />
            {modalForm()}
            <div className="full-centering">
                <MDBBtn
                    onClick={DoTogglePayment}
                    color="none"
                    style={{ "background": currentTheme.primary_color, width: "100%" }}>
                    {I18n.t(`payment-action-button-${typeOrder}`)}
                </MDBBtn>
            </div>
        </>);
    }
}

CashPaymentComponent.propTypes = {
    orderId: propTypes.string,
    currentTheme: propTypes.object,
    typeOrder: propTypes.string,
    color: propTypes.string,
    logo: propTypes.any,
    payment: propTypes.object,
    responseStatus: propTypes.any,
    orderDetails: propTypes.object
}

const mapStateToProps = (state) => ({ //state, ownProps
    currentTheme: state.theme,
    orderDetails: state.detalles
});

const mapDispatchToProps = (dispatch) => ({
    responseStatus: (url, data) => dispatch(asyncfetchOtherPaymentStatus(url, data)),
})

const ConnectedCashPaymentComponent = connect(
    mapStateToProps, mapDispatchToProps
)(CashPaymentComponent)

export default ConnectedCashPaymentComponent;